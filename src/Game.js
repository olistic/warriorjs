import fs from 'fs';
import path from 'path';
import glob from 'glob';
import UI from './UI';
import Config from './Config';
import Profile from './Profile';
import Tower from './Tower';

class Game {
  start() {
    UI.printLine('Welcome to Warrior.js');

    if (fs.existsSync(path.join(Config.getPathPrefix(), '.profile'))) {
      this.setProfile(Profile.load(path.join(Config.getPathPrefix(), '.profile')));
    } else {
      if (!fs.existsSync(path.join(Config.getPathPrefix(), 'warriorjs'))) {
        this.makeGameDirectory();
      }
    }

    this.playNormalMode();
  }

  makeGameDirectory() {
    if (UI.ask('No warriorjs directory found, would you like to create one?')) {
      fs.mkdirSync(path.join(Config.getPathPrefix(), 'warriorjs'));
    } else {
      UI.printLine('Unable to continue without directory.');
      process.exit();
    }
  }

  playNormalMode() {
    if (this.getCurrentLevel().getNumber() === 0) {
      this.prepareNextLevel();
      UI.printLine(`First level has been generated. See the warriorjs/${this.getProfile().getDirectoryName()}/README for instructions.`);
    } else {
      this.playCurrentLevel();
    }
  }

  playCurrentLevel() {
    this.getCurrentLevel().loadPlayer();
    UI.printLine(`Starting Level ${this.getCurrentLevel().getNumber()}`);
    this.getCurrentLevel().play();
    if (this.getCurrentLevel().passed()) {
      if (this.getNextLevel()) {
        UI.printLine('Success! You have found the stairs.');
      } else {
        UI.printLine('CONGRATULATIONS! You have climbed to the top of the tower.');
      }

      this.getCurrentLevel().tallyPoints();
      this.requestNextLevel();
    } else {
      UI.printLine(`Sorry, you failed level ${this.getCurrentLevel().getNumber()}. Change your script and try again.`);
      if (!Config.getSkipInput() && this.getCurrentLevel().getClue() && UI.ask('Would you like to read the additional clues for this level?')) {
        UI.printLine(this.getCurrentLevel().getClue());
      }
    }
  }

  requestNextLevel() {
    if (!Config.getSkipInput() && this.getNextLevel() && UI.ask('Would you like to continue on to the next level?')) {
      this.prepareNextLevel();
      UI.printLine(`See the updated README in the warriorjs/${this.getProfile().getDirectoryName()} directory.`);
    } else {
      UI.printLine('Staying on current level. Try to earn more points next time.');
    }
  }

  prepareNextLevel() {
    this.getNextLevel().generatePlayerFiles();
    this.getProfile().setLevelNumber(this.getProfile().getLevelNumber() + 1);
    this.getProfile().save();
  }

  /*
   * Profiles
   */

  getProfiles() {
    return this.getProfilePaths().map((profile) => Profile.load(profile));
  }

  getProfilePaths() {
    return glob.sync(path.join(Config.getPathPrefix(), 'warriorjs', '**', '.profile'));
  }

  getProfile() {
    this._profile = this._profile || this.chooseProfile();
    return this._profile;
  }

  newProfile() {
    let profile = new Profile();
    profile.setTowerPath(UI.choose('tower', this.getTowers()).getPath());
    profile.setWarriorName(UI.request('Enter a name for your warrior: '));
    return profile;
  }

  chooseProfile() {
    let profile = UI.choose('profile', this.getProfiles().concat('New profile'));
    if (profile === 'New profile') {
      profile = this.newProfile();
      if (this.getProfiles().some((p) => p.getPlayerPath() === profile.getPlayerPath())) {
        if (UI.ask('Are you sure you want to replace your existing profile for this tower?')) {
          UI.printLine('Replacing existing profile.');
        } else {
          UI.printLine('Not replacing profile.');
          process.exit();
        }
      }
    }

    return profile;
  }

  /*
   * Towers
   */

  getTowers() {
    return this.getTowerPaths().map((towerPath) => new Tower(towerPath));
  }

  getTowerPaths() {
    return glob.sync(path.resolve(__dirname, '..', 'towers', '*'));
  }

  /*
   * Levels
   */

  getCurrentLevel() {
    this._currentLevel = this._currentLevel || this.getProfile().getCurrentLevel();
    return this._currentLevel;
  }

  getNextLevel() {
    this._nextLevel = this._nextLevel || this.getProfile().getNextLevel();
    return this._nextLevel;
  }
}

export default Game;
