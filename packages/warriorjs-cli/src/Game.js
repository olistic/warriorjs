import fs from 'fs';
import path from 'path';

import globby from 'globby';
import getLevelConfig from '@warriorjs/helper-get-level-config';
import getLevelScore from '@warriorjs/helper-get-level-score';
import { getLevel, runLevel } from '@warriorjs/core';

import GameError from './GameError';
import Profile from './Profile';
import ProfileGenerator from './ProfileGenerator';
import getWarriorNameSuggestions from './utils/getWarriorNameSuggestions';
import loadTowers from './loadTowers';
import printFailureLine from './ui/printFailureLine';
import printLevelReport from './ui/printLevelReport';
import printLevel from './ui/printLevel';
import printLine from './ui/printLine';
import printPlay from './ui/printPlay';
import printSeparator from './ui/printSeparator';
import printSuccessLine from './ui/printSuccessLine';
import printTowerReport from './ui/printTowerReport';
import printWarningLine from './ui/printWarningLine';
import printWelcomeHeader from './ui/printWelcomeHeader';
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
   * @param {boolean} silencePlay Whether to suppress play log or not.
   * @param {number} delay The delay between each turn in seconds.
   * @param {boolean} assumeYes Whether to answer yes to every question or not.
   */
  constructor(runDirectoryPath, practiceLevel, silencePlay, delay, assumeYes) {
    this.runDirectoryPath = runDirectoryPath;
    this.practiceLevel = practiceLevel;
    this.silencePlay = silencePlay;
    this.delay = delay * 1000;
    this.assumeYes = assumeYes;
    this.gameDirectoryPath = path.join(this.runDirectoryPath, gameDirectory);
  }

  /**
   * Starts the game.
   */
  async start() {
    printWelcomeHeader();

    try {
      this.towers = loadTowers();

      this.profile = await this.loadProfile();

      if (this.profile.isEpic()) {
        await this.playEpicMode();
      } else {
        await this.playNormalMode();
      }
    } catch (err) {
      if (err instanceof GameError || err.code === 'InvalidPlayerCode') {
        printFailureLine(err.message);
      } else {
        throw err;
      }
    }
  }

  /**
   * Loads a profile into the game.
   *
   * If the game is being run from a profile directory, that profile will be
   * loaded. If not, the player will be given the option to choose a profile.
   *
   * @returns {Profile} The loaded profile.
   */
  async loadProfile() {
    const profile = Profile.load(this.runDirectoryPath, this.towers);
    if (profile) {
      return profile;
    }

    return this.chooseProfile();
  }

  /**
   * Gives the player the option to choose one of the available profiles.
   *
   * If there are no profiles available in the game directory or the player
   * chooses to, creates a new profile.
   *
   * @returns {Profile} The chosen profile.
   */
  async chooseProfile() {
    const profiles = this.getProfiles();
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
   *
   * @returns {Profile[]} The available profiles.
   */
  getProfiles() {
    const profileDirectoriesPaths = this.getProfileDirectoriesPaths();
    return profileDirectoriesPaths.map(profileDirectoryPath =>
      Profile.load(profileDirectoryPath, this.towers),
    );
  }

  /**
   * Creates a new profile.
   *
   * @returns {Profile} The created profile.
   */
  async createProfile() {
    const warriorNameSuggestions = getWarriorNameSuggestions();
    const warriorName = await requestInput(
      'Enter a name for your warrior:',
      warriorNameSuggestions,
    );
    if (!warriorName) {
      throw new GameError(
        'Your warrior must have a name if you want him or her to become a legend!',
      );
    }

    const towerChoices = this.towers;
    const tower = await requestChoice('Choose a tower:', towerChoices);

    const profileDirectoryPath = path.join(
      this.gameDirectoryPath,
      `${warriorName}-${tower.id}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    );

    const profile = new Profile(warriorName, tower, profileDirectoryPath);

    if (this.isExistingProfile(profile)) {
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
      profile.makeProfileDirectory();
    }

    return profile;
  }

  /**
   * Checks if the given profile exists in the game directory.
   *
   * @param {Profile} profile A profile to check existance for.
   *
   * @returns {boolean} Whether the profile exists or not..
   */
  isExistingProfile(profile) {
    const profileDirectoriesPaths = this.getProfileDirectoriesPaths();
    return profileDirectoriesPaths.some(
      profileDirectoryPath => profileDirectoryPath === profile.directoryPath,
    );
  }

  /**
   * Returns the paths to the profiles available in the game directory.
   *
   * @returns {string[]} The paths to the available profiles.
   */
  getProfileDirectoriesPaths() {
    this.ensureGameDirectory();
    const profileDirectoryPattern = path.join(this.gameDirectoryPath, '*');
    return globby.sync(profileDirectoryPattern, { onlyDirectories: true });
  }

  /**
   * Ensures the game directory exists.
   */
  ensureGameDirectory() {
    try {
      if (!fs.statSync(this.gameDirectoryPath).isDirectory()) {
        throw new GameError(
          'A file named warriorjs exists at this location. Please change the directory under which you are running warriorjs.',
        );
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }

      fs.mkdirSync(this.gameDirectoryPath);
    }
  }

  /**
   * Plays through epic mode.
   */
  async playEpicMode() {
    this.delay /= 2;

    if (this.practiceLevel) {
      const hasPracticeLevel = this.profile.tower.hasLevel(this.practiceLevel);
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

      this.profile.updateEpicScore();
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
      this.prepareNextLevel();
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
    const { tower, warriorName, epic } = this.profile;
    const levelConfig = getLevelConfig(tower, levelNumber, warriorName, epic);

    const level = getLevel(levelConfig);
    printLevel(level);

    const playerCode = this.profile.readPlayerCode();
    const levelResult = runLevel(levelConfig, playerCode);

    if (!this.silencePlay) {
      await printPlay(levelResult.events, this.delay);
    }

    printSeparator();

    if (!levelResult.passed) {
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
          this.profile.requestClue();
          this.generateProfileFiles();
          printSuccessLine(
            `See ${this.profile.getReadmeFilePath()} for the clues.`,
          );
        }
      }

      return false;
    }

    const hasNextLevel = this.profile.tower.hasLevel(levelNumber + 1);

    if (hasNextLevel) {
      printSuccessLine('Success! You have found the stairs.');
    } else {
      printSuccessLine(
        'CONGRATULATIONS! You have climbed to the top of the tower.',
      );
    }

    const scoreParts = getLevelScore(levelResult, levelConfig);
    const totalScore = Object.values(scoreParts).reduce(
      (sum, value) => sum + value,
      0,
    );
    const grade = (totalScore * 1.0) / levelConfig.aceScore;
    printLevelReport(this.profile, scoreParts, totalScore, grade);
    this.profile.tallyPoints(levelNumber, totalScore, grade);

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
   * Gives the player the option to continue on to the next level.
   *
   * If the last level has already being reached, the player can choose to
   * continue on to epic mode.
   */
  async requestNextLevel() {
    if (this.profile.tower.hasLevel(this.profile.levelNumber + 1)) {
      const continueToNextLevel =
        this.assumeYes ||
        (await requestConfirmation(
          'Would you like to continue on to the next level?',
          true,
        ));
      if (continueToNextLevel) {
        this.prepareNextLevel();
        printSuccessLine(
          `See ${this.profile.getReadmeFilePath()} for updated instructions.`,
        );
      } else {
        printLine(
          'Staying on current level. Try to earn more points next time.',
        );
      }
    } else {
      const continueToEpicMode =
        this.assumeYes ||
        (await requestConfirmation(
          'Would you like to continue on to epic mode?',
          true,
        ));
      if (continueToEpicMode) {
        this.prepareEpicMode();
        printSuccessLine('Run warriorjs again to play epic mode.');
      }
    }
  }

  /**
   * Prepares the next level.
   */
  prepareNextLevel() {
    this.profile.goToNextLevel();
    this.generateProfileFiles();
  }

  /**
   * Generates the profile files.
   */
  generateProfileFiles() {
    const { tower, levelNumber, warriorName, epic } = this.profile;
    const levelConfig = getLevelConfig(tower, levelNumber, warriorName, epic);
    const level = getLevel(levelConfig);
    new ProfileGenerator(this.profile, level).generate();
  }

  /**
   * Prepares the epic mode.
   */
  prepareEpicMode() {
    this.profile.enableEpicMode();
  }
}

export default Game;
