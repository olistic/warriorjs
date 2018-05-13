import path from 'path';

import globby from 'globby';
import makeDir from 'make-dir';
import pathType from 'path-type';
import { PlayerError, getLevel, runLevel } from '@warriorjs/core';

import GameError from './GameError';
import PlayerGenerator from './PlayerGenerator';
import Profile from './Profile';
import Tower from './Tower';
import getLevelConfig from './utils/getLevelConfig';
import printFailureLine from './ui/printFailureLine';
import printLevelReport from './ui/printLevelReport';
import printLine from './ui/printLine';
import printPlay from './ui/printPlay';
import printSuccessLine from './ui/printSuccessLine';
import printTowerReport from './ui/printTowerReport';
import printWarningLine from './ui/printWarningLine';
import requestChoice, { SEPARATOR } from './ui/requestChoice';
import requestConfirmation from './ui/requestConfirmation';
import requestInput from './ui/requestInput';

const gameDirectory = 'warriorjs';

/** Class representing a game. */
class Game {
  /**
   * Creates a game.
   *
   * @param {string} runDirectoryPath The directory under which to run the game.
   * @param {number} practiceLevel The level to practice.
   * @param {number} delay The delay between each turn in seconds.
   * @param {boolean} assumeYes Whether to answer yes to every question or not.
   */
  constructor(runDirectoryPath, practiceLevel, delay, assumeYes) {
    this.runDirectoryPath = runDirectoryPath;
    this.gameDirectoryPath = path.join(this.runDirectoryPath, gameDirectory);
    this.practiceLevel = practiceLevel;
    this.delay = delay * 1000;
    this.assumeYes = assumeYes;
  }

  /**
   * Starts the game.
   */
  async start() {
    printLine('Welcome to WarriorJS');

    try {
      this.profile = await this.loadProfile();
      this.tower = Tower.getTowerByName(this.profile.towerName);
      if (this.profile.isEpic()) {
        await this.playEpicMode();
      } else {
        await this.playNormalMode();
      }
    } catch (err) {
      if (err instanceof GameError) {
        printFailureLine(err.message);
      } else {
        throw err;
      }
    }
  }

  /**
   * Loads a profile into the game.
   *
   * If there is a .profile file in the run directory, that profile will be
   * loaded.
   *
   * If not, the player will be given the option to choose a profile.
   */
  async loadProfile() {
    const profile = await Profile.load(this.runDirectoryPath);
    if (profile) {
      return profile;
    }

    await this.ensureGameDirectory();

    return this.chooseProfile();
  }

  /**
   * Ensures the game directory exists.
   */
  async ensureGameDirectory() {
    const directoryExists = await this.gameDirectoryExists();
    if (!directoryExists) {
      await this.makeGameDirectory();
    }
  }

  /**
   * Checks if the game directory exists.
   */
  async gameDirectoryExists() {
    return pathType.dir(this.gameDirectoryPath);
  }

  /**
   * Creates the game directory.
   */
  async makeGameDirectory() {
    const makeDirectory = await requestConfirmation(
      'No warriorjs directory found, would you like to create one?',
      true,
    );
    if (!makeDirectory) {
      throw new GameError('Unable to continue without directory.');
    }

    try {
      await makeDir(this.gameDirectoryPath);
    } catch (err) {
      if (err.code === 'EEXIST') {
        throw new GameError(
          'A file warriorjs already exists at this location. Please change the directory under which you are running warriorjs.',
        );
      }

      throw err;
    }
  }

  /**
   * Gives the player the option to choose one of the available profiles.
   *
   * If there are no profiles available in the game directory or the player
   * chooses to, creates a new profile.
   */
  async chooseProfile() {
    const profiles = await this.getProfiles();
    if (profiles.length) {
      const newProfileChoice = 'New profile';
      const profileChoices = [...profiles, SEPARATOR, newProfileChoice];
      const profile = await requestChoice('Choose a profile:', profileChoices);
      if (profile !== newProfileChoice) {
        return profile;
      }
    }

    return this.createProfile();
  }

  /**
   * Returns the profiles available in the game directory.
   */
  async getProfiles() {
    const profileDirectoriesPaths = await this.getProfileDirectoriesPaths();
    return Promise.all(
      profileDirectoriesPaths.map(profileDirectoryPath =>
        Profile.load(profileDirectoryPath),
      ),
    );
  }

  /**
   * Creates a new profile.
   */
  async createProfile() {
    const warriorName = await requestInput('Enter a name for your warrior:');
    if (!warriorName) {
      throw new GameError(
        'Your warrior must have a name if you want him or her to become a legend!',
      );
    }

    const towerChoices = Tower.getTowers();
    const tower = await requestChoice('Choose a tower:', towerChoices);

    const profileDirectoryPath = path.join(
      this.gameDirectoryPath,
      `${warriorName}-${tower}`.toLowerCase().replace(/[^a-z0-9]+/, '-'),
    );

    const profile = new Profile(warriorName, tower.name, profileDirectoryPath);

    const profileExists = await this.isExistingProfile(profile);
    if (profileExists) {
      printWarningLine(
        `There's already a warrior named ${warriorName} climbing the ${tower} tower.`,
      );
      const replaceExisting = await requestConfirmation(
        'Do you want to replace your existing profile for this tower?',
      );
      if (!replaceExisting) {
        throw new GameError('Unable to continue without a profile.');
      }

      printLine('Replacing existing profile...');
    } else {
      await profile.ensureProfileDirectory();
    }

    return profile;
  }

  /**
   * Checks if the given profile exists in the game directory.
   *
   * @param {Profile} profile A profile to check existance for.
   */
  async isExistingProfile(profile) {
    const profileDirectoriesPaths = await this.getProfileDirectoriesPaths();
    return profileDirectoriesPaths.some(
      profileDirectoryPath => profileDirectoryPath === profile.directoryPath,
    );
  }

  /**
   * Returns the paths to the profiles available in the game directory.
   */
  async getProfileDirectoriesPaths() {
    const profileDirectoryPattern = path.join(this.gameDirectoryPath, '*');
    return globby(profileDirectoryPattern, { onlyDirectories: true });
  }

  /**
   * Plays through epic mode.
   */
  async playEpicMode() {
    this.delay /= 2;

    this.profile.currentEpicScore = 0;
    this.profile.currentEpicGrades = {};

    if (this.practiceLevel) {
      const hasPracticeLevel = this.tower.hasLevel(this.practiceLevel);
      if (!hasPracticeLevel) {
        throw new GameError(
          'Unable to practice non-existent level, try another.',
        );
      }

      await this.playLevel(this.practiceLevel);
    } else {
      let levelNumber = 0;
      let playing = true;
      while (playing) {
        levelNumber += 1;
        playing = await this.playLevel(levelNumber); // eslint-disable-line no-await-in-loop
      }

      await this.profile.updateEpicScore();
    }
  }

  /**
   * Plays through normal mode.
   */
  async playNormalMode() {
    if (this.practiceLevel) {
      throw new GameError(
        'Unable to practice level while not in epic mode, remove -l option.',
      );
    }

    if (this.profile.levelNumber === 0) {
      await this.prepareNextLevel();
      printSuccessLine(
        `First level has been generated. See ${this.profile.getReadmeFilePath()} for instructions.`,
      );
    } else {
      await this.playLevel(this.profile.levelNumber);
    }
  }

  /**
   * Plays the level with the given number.
   *
   * @param {number} levelNumber The number of the level to play.
   *
   * @returns {boolean} Whether playing can continue or not (for epic mode),
   */
  async playLevel(levelNumber) {
    const levelConfig = getLevelConfig(levelNumber, this.tower, this.profile);

    const { events, passed, score } = await this.runLevel(levelConfig);

    await printPlay(levelNumber, events, this.delay);

    if (!passed) {
      printFailureLine(
        `Sorry, you failed level ${levelNumber}. Change your script and try again.`,
      );

      if (levelConfig.clue && !this.profile.isShowingClue()) {
        const showClue =
          this.assumeYes ||
          (await requestConfirmation(
            'Would you like to read the additional clues for this level?',
          ));
        if (showClue) {
          await this.profile.requestClue();
          await this.generatePlayer();
          printSuccessLine(
            `See ${this.profile.getReadmeFilePath()} for the clues.`,
          );
        }
      }

      return false;
    }

    const hasNextLevel = this.tower.hasLevel(levelNumber + 1);

    if (hasNextLevel) {
      printSuccessLine('Success! You have found the stairs.');
    } else {
      printSuccessLine(
        'CONGRATULATIONS! You have climbed to the top of the tower.',
      );
    }

    const { aceScore } = levelConfig;

    printLevelReport(this.profile, score, aceScore);

    const { warriorScore, timeBonus, clearBonus } = score;
    const totalScore = warriorScore + timeBonus + clearBonus;
    this.profile.tallyPoints(levelNumber, totalScore, aceScore);

    if (this.profile.isEpic()) {
      if (!hasNextLevel && !this.practiceLevel) {
        printTowerReport(this.profile);
      }
    } else {
      await this.requestNextLevel();
    }

    return hasNextLevel;
  }

  /**
   * Runs the level with the given config and the player code.
   *
   * @param {Object} levelConfig The config of the level.
   *
   * @returns {Object} The play.
   */
  async runLevel(levelConfig) {
    const playerCode = await this.profile.readPlayerCode();
    try {
      return runLevel(levelConfig, playerCode);
    } catch (err) {
      if (err instanceof PlayerError) {
        throw new GameError(err.message);
      }

      throw err;
    }
  }

  /**
   * Gives the player the option to continue on to the next level.
   *
   * If the last level has already being reached, the player can choose to
   * continue on to epic mode.
   */
  async requestNextLevel() {
    if (this.tower.hasLevel(this.profile.levelNumber + 1)) {
      const continueToNextLevel =
        this.assumeYes ||
        (await requestConfirmation(
          'Would you like to continue on to the next level?',
        ));
      if (continueToNextLevel) {
        await this.prepareNextLevel();
        printSuccessLine(
          `See ${this.profile.getReadmeFilePath()} for updated instructions.`,
        );
      } else {
        printLine(
          'Staying on current level. Try to earn more points next time.',
        );
      }
    } else {
      const continueToEpicMode = await requestConfirmation(
        'Would you like to continue on to epic mode?',
      );
      if (continueToEpicMode) {
        await this.prepareEpicMode();
        printSuccessLine('Run warriorjs again to play epic mode.');
      }
    }
  }

  /**
   * Prepares the next level.
   */
  async prepareNextLevel() {
    await this.profile.goToNextLevel();
    await this.generatePlayer();
  }

  /**
   * Generates the player.
   */
  async generatePlayer() {
    const levelConfig = getLevelConfig(
      this.profile.levelNumber,
      this.tower,
      this.profile,
    );
    const level = getLevel(levelConfig);
    await new PlayerGenerator(this.profile, level).generate();
  }

  /**
   * Prepares the epic mode.
   */
  async prepareEpicMode() {
    await this.profile.enableEpicMode();
  }
}

export default Game;
