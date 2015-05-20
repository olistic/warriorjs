import fs from 'fs';
import path from 'path';
import glob from 'glob';
import UI from './UI';
import Config from './Config';
import Profile from './Profile';
import Tower from './Tower';
import Level from './Level';

class Game {
  start() {
    UI.printLine('Welcome to WarriorJS');

    if (fs.existsSync(path.join(Config.getPathPrefix(), '.profile'))) {
      this.setProfile(Profile.load(path.join(Config.getPathPrefix(), '.profile')));
    } else {
      if (!fs.existsSync(path.join(Config.getPathPrefix(), 'warriorjs'))) {
        this.makeGameDirectory();
      }
    }

    if (this.getProfile().isEpic()) {
      if (this.getProfile().hasLevelAfterEpic()) {
        this.goToNormalMode();
      } else {
        this.playEpicMode();
      }
    } else {
      this.playNormalMode();
    }
  }

  makeGameDirectory() {
    if (UI.ask('No warriorjs directory found, would you like to create one?')) {
      fs.mkdirSync(path.join(Config.getPathPrefix(), 'warriorjs'));
    } else {
      UI.printLine('Unable to continue without directory.');
      process.exit();
    }
  }

  playEpicMode() {
    if (Config.getDelay()) {
      Config.setDelay(Config.getDelay() / 2);
    }

    this.getProfile().setCurrentEpicScore(0);
    this.getProfile().setCurrentEpicGrades({});
    if (Config.getPracticeLevel()) {
      if (new Level(this.getProfile(), Config.getPracticeLevel()).exists()) {
        this._currentLevel = this._nextLevel = null;
        this.getProfile().setLevelNumber(Config.getPracticeLevel());
        this.playCurrentLevel();
      } else {
        UI.printLine('Unable to practice non-existent level, try another.');
      }
    } else {
      let playing = true;
      while (playing) {
        this._currentLevel = this._nextLevel = null;
        this.getProfile().incLevelNumber();
        playing = this.playCurrentLevel();
      }
      this.getProfile().save();
    }
  }

  playNormalMode() {
    if (Config.getPracticeLevel()) {
      UI.printLine('Unable to practice level while not in epic mode, remove -l option.');
    } else {
      if (this.getCurrentLevel().getNumber() === 0) {
        this.prepareNextLevel();
        UI.printLine(`First level has been generated. See the warriorjs/${this.getProfile().getDirectoryName()}/README for instructions.`);
      } else {
        this.playCurrentLevel();
      }
    }
  }

  playCurrentLevel() {
    let playing = true;
    this.getCurrentLevel().loadPlayer();
    UI.printLine(`Starting Level ${this.getCurrentLevel().getNumber()}`);
    this.getCurrentLevel().play();
    if (this.getCurrentLevel().passed()) {
      if (this.getNextLevel().exists()) {
        UI.printLine('Success! You have found the stairs.');
      } else {
        UI.printLine('CONGRATULATIONS! You have climbed to the top of the tower.');
        playing = false;
      }

      this.getCurrentLevel().tallyPoints();
      if (this.getProfile().isEpic()) {
        if (this.getFinalReport() && !playing) {
          UI.printLine(this.getFinalReport());
        }
      } else {
        this.requestNextLevel();
      }
    } else {
      playing = false;
      UI.printLine(`Sorry, you failed level ${this.getCurrentLevel().getNumber()}. Change your script and try again.`);
      if (!Config.getSkipInput() && this.getCurrentLevel().getClue() && UI.ask('Would you like to read the additional clues for this level?')) {
        UI.printLine(this.getCurrentLevel().getClue());
      }
    }

    return playing;
  }

  requestNextLevel() {
    if (!Config.getSkipInput() && (this.getNextLevel().exists() ? UI.ask('Would you like to continue on to the next level?') : UI.ask('Would you like to continue on to epic mode?'))) {
      if (this.getNextLevel().exists()) {
        this.prepareNextLevel();
        UI.printLine(`See the updated README in the warriorjs/${this.getProfile().getDirectoryName()} directory.`);
      } else {
        this.prepareEpicMode();
        UI.printLine('Run warriorjs again to play epic mode.');
      }
    } else {
      UI.printLine('Staying on current level. Try to earn more points next time.');
    }
  }

  prepareNextLevel() {
    this.getNextLevel().generatePlayerFiles();
    this.getProfile().incLevelNumber();
    this.getProfile().save();
  }

  prepareEpicMode() {
    this.getProfile().enableEpicMode();
    this.getProfile().setLevelNumber(0);
    this.getProfile().save();
  }

  goToNormalMode() {
    this.getProfile().enableNormalMode();
    this.prepareNextLevel();
    UI.printLine('Another level has been added since you started epic, going back to normal mode.');
    UI.printLine(`See the updated README in the warriorjs/${this.getProfile().getDirectoryName()} directory.`);
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

  setProfile(profile) {
    this._profile = profile;
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

  getFinalReport() {
    if (this.getProfile().calculateAverageGrade() && !Config.getPracticeLevel()) {
      let report = '';
      report += `Your average grade for this tower is: ${Level.getGradeLetter(this.getProfile().calculateAverageGrade())}\n\n`;
      Object.keys(this.getProfile().getCurrentEpicGrades()).sort().forEach((level) => {
        report += `  Level ${level}: ${Level.getGradeLetter(this.getProfile().getCurrentEpicGrades()[level])}\n`;
      });
      report += `\nTo practice a level, use the -l option.`;
      return report;
    }

    return null;
  }
}

export default Game;
