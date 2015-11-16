import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import Promise from 'bluebird';
import Engine from 'warriorjs-engine';
import UI from './UI';
import Config from './Config';
import Profile from './Profile';
import PlayerGenerator from './PlayerGenerator';
import Tower from './Tower';

Promise.promisifyAll(fs);
Promise.promisifyAll(glob);

class Game {
  _profile;
  _profilePath = path.join(Config.getPathPrefix(), '.profile');
  _gameDirectoryPath = path.join(Config.getPathPrefix(), 'warriorjs');

  start() {
    UI.printLine('Welcome to WarriorJS');

    this.getProfile()
      .then((profile) => {
        this._profile = profile;

        if (profile.isEpic()) {
          return this.hasLevelAfterEpic()
            .then((hasLevel) => {
              if (hasLevel) {
                return this.goToNormalMode();
              }

              return this.playEpicMode();
            });
        }

        return this.playNormalMode();
      })
      .catch((err) => UI.printLine(err.message));
  }

  /*
   * Play
   */

  playEpicMode() {
    if (Config.getDelay()) {
      Config.setDelay(Config.getDelay() / 2);
    }

    this._profile.setCurrentEpicScore(0);
    this._profile.setCurrentEpicGrades({});

    if (Config.getPracticeLevel()) {
      return this.levelExists(Config.getPracticeLevel())
        .then((exists) => {
          if (exists) {
            this._profile.setLevelNumber(Config.getPracticeLevel());
            return this.playCurrentLevel();
          }

          throw new Error('Unable to practice non-existent level, try another.');
        });
    }

    const playLoop = () => {
      return this.playCurrentLevel()
        .then((playing) => {
          if (!playing) {
            return Promise.resolve();
          }

          this._profile.incLevelNumber();
          return playLoop();
        });
    };

    this._profile.incLevelNumber();
    return playLoop().then(() => this._profile.save());
  }

  playNormalMode() {
    if (Config.getPracticeLevel()) {
      throw new Error('Unable to practice level while not in epic mode, remove -l option.');
    } else {
      if (this._profile.getLevelNumber() === 0) {
        return this.prepareNextLevel()
          .then(() => UI.printLine(`First level has been generated. See the warriorjs/${this._profile.getDirectoryName()}/README for instructions.`));
      }

      return this.playCurrentLevel();
    }
  }

  playCurrentLevel() {
    let playing = true;
    return Promise.join(this.getPlayerCode(), this.getCurrentLevelConfig(), (playerCode, config) => {
      const warrior = {
        playerCode,
        name: this._profile.getWarriorName(),
        abilities: this._profile.getAbilities(),
      };

      const { passed, trace, points } = Engine.playLevel(config, warrior);
      return UI.printTrace(trace)
        .then(() => {
          if (passed) {
            return this.levelExists(this._profile.getLevelNumber() + 1)
              .then((exists) => {
                if (exists) {
                  UI.printLine('Success! You have found the stairs.');
                } else {
                  playing = false;
                  UI.printLine('CONGRATULATIONS! You have climbed to the top of the tower.');
                }

                this.tallyPoints(points, config.aceScore);
                this._profile.addAbilities(config.warrior.abilities);
                if (this._profile.isEpic()) {
                  if (!playing && !Config.getPracticeLevel() && this._profile.calculateAverageGrade()) {
                    UI.printLine(this.getFinalReport());
                  }

                  return Promise.resolve(playing);
                }

                return this.requestNextLevel().then(() => Promise.resolve(playing));
              });
          }

          playing = false;
          UI.printLine(`Sorry, you failed level ${this._profile.getLevelNumber()}. Change your script and try again.`);
          if (!Config.getSkipInput() && config.clue) {
            return UI.ask('Would you like to read the additional clues for this level?')
              .then((answer) => {
                if (answer) {
                  UI.printLine(config.clue);
                }

                return Promise.resolve(playing);
              });
          }

          return Promise.resolve(playing);
        });
    });
  }

  getPlayerCode() {
    return fs.readFileAsync(path.join(this._profile.getPlayerPath(), 'Player.js'), 'utf8');
  }

  generatePlayerFiles() {
    return this.getCurrentLevelConfig().then((level) => new PlayerGenerator(this._profile, level).generate());
  }

  requestNextLevel() {
    if (!Config.getSkipInput()) {
      return this.levelExists(this._profile.getLevelNumber() + 1)
        .then((exists) => {
          if (exists) {
            return UI.ask('Would you like to continue on to the next level?')
              .then((answer) => {
                if (answer) {
                  return this.prepareNextLevel()
                    .then(() => {
                      UI.printLine(`See the updated README in the warriorjs/${this._profile.getDirectoryName()} directory.`);
                      return Promise.resolve();
                    });
                }
              });
          }

          return UI.ask('Would you like to continue on to epic mode?')
            .then((answer) => {
              if (answer) {
                return this.prepareEpicMode()
                  .then(() => {
                    UI.printLine('Run warriorjs again to play epic mode.');
                    return Promise.resolve();
                  });
              }
            });
        });
    }

    UI.printLine('Staying on current level. Try to earn more points next time.');
    return Promise.resolve();
  }

  prepareNextLevel() {
    this._profile.incLevelNumber();
    return this.generatePlayerFiles().then(() => this._profile.save());
  }

  prepareEpicMode() {
    this._profile.enableEpicMode();
    this._profile.setLevelNumber(0);
    return this._profile.save();
  }

  goToNormalMode() {
    this._profile.enableNormalMode();
    return this.prepareNextLevel()
      .then(() => {
        UI.printLine('Another level has been added since you started epic, going back to normal mode.');
        UI.printLine(`See the updated README in the warriorjs/${this._profile.getDirectoryName()} directory.`);
        return Promise.resolve();
      });
  }

  /*
   * Score
   */

  tallyPoints(points, aceScore) {
    let score = 0;

    UI.printLine(`Level Score: ${points.levelScore}`);
    score += points.levelScore;

    UI.printLine(`Time Bonus: ${points.timeBonus}`);
    score += points.timeBonus;

    UI.printLine(`Clear Bonus: ${points.clearBonus}`);
    score += points.clearBonus;

    if (this._profile.isEpic()) {
      if (aceScore) {
        UI.printLine(`Level Grade: ${Game.getGradeFor(score, aceScore)}`);
      }

      UI.printLine(`Total Score: ${Game.scoreCalculation(this._profile.getCurrentEpicScore(), score)}`);
      if (aceScore) {
        this._profile.getCurrentEpicGrades()[this._profile.getLevelNumber()] = (score * 1.0 / aceScore);
      }

      this._profile.addCurrentEpicScore(score);
    } else {
      UI.printLine(`Total Score: ${Game.scoreCalculation(this._profile.getScore(), score)}`);
      this._profile.addScore(score);
    }
  }

  getFinalReport() {
    let report = '';
    report += `Your average grade for this tower is: ${Game.getGradeLetter(this._profile.calculateAverageGrade())}\n\n`;
    Object.keys(this._profile.getCurrentEpicGrades()).sort().forEach((level) => {
      report += `  Level ${level}: ${Game.getGradeLetter(this._profile.getCurrentEpicGrades()[level])}\n`;
    });

    report += `\nTo practice a level, use the -l option.`;
    return report;
  }

  static getGradeFor(score, aceScore) {
    return Game.getGradeLetter(score * 1.0 / aceScore);
  }

  static getGradeLetter(percent) {
    if (percent >= 1.0) {
      return 'S';
    } else if (percent >= 0.9) {
      return 'A';
    } else if (percent >= 0.8) {
      return 'B';
    } else if (percent >= 0.7) {
      return 'C';
    } else if (percent >= 0.6) {
      return 'D';
    }

    return 'F';
  }

  static scoreCalculation(currentScore, addition) {
    if (currentScore === 0) {
      return addition.toString();
    }

    return `${currentScore} + ${addition} = ${currentScore + addition}`;
  }

  /*
   * Profiles
   */

  getProfile() {
    return this.profileExists()
      .then((exists) => {
        if (exists) {
          return Profile.load(this._profilePath);
        }

        return this.chooseProfile();
      });
  }

  profileExists() {
    return new Promise((resolve) => {
      fs.statAsync(this._profilePath)
        .then(() => resolve(true))
        .catch({ code: 'ENOENT' }, () => resolve(false));
    });
  }

  chooseProfile() {
    const newProfileChoice = 'New profile';
    return this.getProfiles()
      .then((profileChoices) => {
        return UI.choose('profile', profileChoices.concat(newProfileChoice));
      })
      .then((profile) => {
        if (profile === newProfileChoice) {
          return this.newProfile();
        }

        return Promise.resolve(profile);
      });
  }

  getProfiles() {
    return this.getProfilePaths()
      .then((profilePaths) => {
        return Promise.map(profilePaths, (profilePath) => Profile.load(profilePath));
      });
  }

  getProfilePaths() {
    return this.ensureGameDirectory()
      .then(() => {
        const profilePattern = path.join(Config.getPathPrefix(), 'warriorjs', '**', '.profile');
        return glob.globAsync(profilePattern);
      });
  }

  ensureGameDirectory() {
    return this.gameDirectoryExists()
      .then((exists) => {
        if (!exists) {
          return this.makeGameDirectory();
        }

        return Promise.resolve();
      });
  }

  gameDirectoryExists() {
    return new Promise((resolve) => {
      fs.statAsync(this._gameDirectoryPath)
        .then(() => resolve(true))
        .catch({ code: 'ENOENT' }, () => resolve(false));
    });
  }

  makeGameDirectory() {
    return UI.ask('No warriorjs directory found, would you like to create one?')
      .then((answer) => {
        if (answer) {
          return fs.mkdirAsync(this._gameDirectoryPath);
        }

        throw new Error('Unable to continue without directory.');
      });
  }

  newProfile() {
    const profile = new Profile();
    return UI.request('Enter a name for your warrior:')
      .then((warriorName) => {
        profile.setWarriorName(warriorName);
        return this.getTowers();
      })
      .then((towerChoices) => UI.choose('tower', towerChoices))
      .then((tower) => {
        profile.setTowerPath(tower.getPath());
        return this.isExistingProfile(profile);
      })
      .then((exists) => {
        if (exists) {
          return UI.ask('Are you sure you want to replace your existing profile for this tower?')
            .then((answer) => {
              if (answer) {
                UI.printLine('Replacing existing profile...');
                return Promise.resolve(profile);
              }

              throw new Error('Unable to continue without profile.');
            });
        }

        return Promise.resolve(profile);
      });
  }

  isExistingProfile(newProfile) {
    return this.getProfiles()
      .then((profiles) => {
        return Promise.resolve(profiles.some((profile) => profile.getPlayerPath() === newProfile.getPlayerPath()));
      });
  }

  /*
   * Towers
   */

  getTowers() {
    return this.getTowerPaths()
      .then((towerPaths) => {
        const towers = towerPaths.map((towerPath) => new Tower(towerPath));
        return Promise.resolve(towers);
      });
  }

  getTowerPaths() {
    const towerPattern = path.resolve(__dirname, '..', 'towers', '*');
    return glob.globAsync(towerPattern);
  }

  /*
   * Levels
   */

  getLevelPath(levelNumber) {
    return path.join(this._profile.getTowerPath(), `level${String(levelNumber).padLeft(3, '0')}.json`);
  }

  levelExists(levelNumber) {
    return new Promise((resolve) => {
      fs.statAsync(this.getLevelPath(levelNumber))
        .then(() => resolve(true))
        .catch({ code: 'ENOENT' }, () => resolve(false));
    });
  }

  getCurrentLevelConfig() {
    const levelNumber = this._profile.getLevelNumber();
    return fs.readJsonAsync(this.getLevelPath(levelNumber));
  }

  hasLevelAfterEpic() {
    if (this._profile.getLastLevelNumber()) {
      return this.levelExists(this._profile.getLastLevelNumber() + 1);
    }

    return Promise.resolve(false);
  }
}

export default Game;
