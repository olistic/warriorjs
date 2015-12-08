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

export default class Game {
  _profile;
  _profilePath = path.join(Config.pathPrefix, '.profile');
  _gameDirectoryPath = path.join(Config.pathPrefix, 'warriorjs');

  start() {
    UI.printLine('Welcome to WarriorJS');

    this.loadProfile()
      .then((profile) => {
        this._profile = profile;

        if (this._profile.isEpic()) {
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
    if (Config.delay) {
      Config.delay = Config.delay / 2;
    }

    this._profile.currentEpicScore = 0;
    this._profile.currentEpicGrades = {};

    if (Config.practiceLevel) {
      return this.levelExists(Config.practiceLevel)
        .then((exists) => {
          if (exists) {
            this._profile.levelNumber = Config.practiceLevel;
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

          this._profile.levelNumber += 1;
          return playLoop();
        });
    };

    this._profile.levelNumber += 1;
    return playLoop().then(() => this._profile.save());
  }

  playNormalMode() {
    if (Config.practiceLevel) {
      throw new Error('Unable to practice level while not in epic mode, remove -l option.');
    } else {
      if (this._profile.levelNumber === 0) {
        return this.prepareNextLevel()
          .then(() => UI.printLine(`First level has been generated. See the warriorjs/${this._profile.directoryName}/README for instructions.`));
      }

      return this.playCurrentLevel();
    }
  }

  playCurrentLevel() {
    let playing = true;
    return Promise.join(this.getPlayerCode(), this.getCurrentLevelConfig(), (playerCode, config) => {
      const profile = {
        playerCode,
        warriorName: this._profile.warriorName,
        abilities: this._profile.abilities,
      };

      const { passed, trace, points } = Engine.playLevel(config, profile);

      return UI.printPlay(trace)
        .then(() => {
          if (passed) {
            return this.levelExists(this._profile.levelNumber + 1)
              .then((exists) => {
                if (exists) {
                  UI.printLine('Success! You have found the stairs.');
                } else {
                  playing = false;
                  UI.printLine('CONGRATULATIONS! You have climbed to the top of the tower.');
                }

                this.tallyPoints(points, config.aceScore);

                const warrior = config.floor.units[0];
                this._profile.addAbilities(warrior.abilities);

                if (this._profile.isEpic()) {
                  if (!playing && !Config.practiceLevel && this._profile.calculateAverageGrade()) {
                    UI.printLine(this.getFinalReport());
                  }

                  return Promise.resolve(playing);
                }

                return this.requestNextLevel().then(() => Promise.resolve(playing));
              });
          }

          playing = false;
          UI.printLine(`Sorry, you failed level ${this._profile.levelNumber}. Change your script and try again.`);
          if (!Config.skipInput && config.clue) {
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
    return fs.readFileAsync(path.join(this._profile.playerPath, 'Player.js'), 'utf8');
  }

  generatePlayerFiles() {
    return this.getCurrentLevelConfig().then((level) => new PlayerGenerator(this._profile, level).generate());
  }

  requestNextLevel() {
    if (!Config.skipInput) {
      return this.levelExists(this._profile.levelNumber + 1)
        .then((exists) => {
          if (exists) {
            return UI.ask('Would you like to continue on to the next level?')
              .then((answer) => {
                if (answer) {
                  return this.prepareNextLevel()
                    .then(() => {
                      UI.printLine(`See the updated README in the warriorjs/${this._profile.directoryName} directory.`);
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
    this._profile.levelNumber += 1;
    return this.generatePlayerFiles().then(() => this._profile.save());
  }

  prepareEpicMode() {
    this._profile.enableEpicMode();
    this._profile.levelNumber = 0;
    return this._profile.save();
  }

  goToNormalMode() {
    this._profile.enableNormalMode();
    return this.prepareNextLevel()
      .then(() => {
        UI.printLine('Another level has been added since you started epic, going back to normal mode.');
        UI.printLine(`See the updated README in the warriorjs/${this._profile.directoryName} directory.`);
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

      UI.printLine(`Total Score: ${Game.scoreCalculation(this._profile.currentEpicScore, score)}`);
      if (aceScore) {
        this._profile.currentEpicGrades[this._profile.levelNumber] = (score * 1.0 / aceScore);
      }

      this._profile.currentEpicScore += score;
    } else {
      UI.printLine(`Total Score: ${Game.scoreCalculation(this._profile.score, score)}`);
      this._profile.score += score;
    }
  }

  getFinalReport() {
    let report = '';
    report += `Your average grade for this tower is: ${Game.getGradeLetter(this._profile.calculateAverageGrade())}\n\n`;
    Object.keys(this._profile.currentEpicGrades).sort().forEach((level) => {
      report += `  Level ${level}: ${Game.getGradeLetter(this._profile.currentEpicGrades[level])}\n`;
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

  loadProfile() {
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
        const profilePattern = path.join(Config.pathPrefix, 'warriorjs', '**', '.profile');
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
        if (!warriorName) {
          throw new Error('Your warrior must have a name if you want him to become a legend!');
        }

        profile.warriorName = warriorName;
        return this.getTowers();
      })
      .then((towerChoices) => UI.choose('tower', towerChoices))
      .then((tower) => {
        profile.towerPath = tower.path;
        return this.isExistingProfile(profile);
      })
      .then((exists) => {
        if (exists) {
          return UI.ask('Are you sure you want to replace your existing profile for this tower?', false)
            .then((answer) => {
              if (!answer) {
                throw new Error('Unable to continue without profile.');
              }

              UI.printLine('Replacing existing profile...');
              return Promise.resolve(profile);
            });
        }

        return Promise.resolve(profile);
      });
  }

  isExistingProfile(newProfile) {
    return this.getProfiles()
      .then((profiles) => {
        return Promise.resolve(profiles.some((profile) => profile.playerPath === newProfile.playerPath));
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
    return path.join(this._profile.towerPath, `level${String(levelNumber).padLeft(3, '0')}.json`);
  }

  levelExists(levelNumber) {
    return new Promise((resolve) => {
      fs.statAsync(this.getLevelPath(levelNumber))
        .then(() => resolve(true))
        .catch({ code: 'ENOENT' }, () => resolve(false));
    });
  }

  getCurrentLevelConfig() {
    const levelNumber = this._profile.levelNumber;
    return fs.readJsonAsync(this.getLevelPath(levelNumber));
  }

  hasLevelAfterEpic() {
    if (this._profile.lastLevelNumber) {
      return this.levelExists(this._profile.lastLevelNumber + 1);
    }

    return Promise.resolve(false);
  }
}
