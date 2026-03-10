import fs from 'fs';
import path from 'path';

import { globbySync } from 'globby';
import getLevelConfig from '@warriorjs/helper-get-level-config';
import getLevelScore from '@warriorjs/helper-get-level-score';
import { getLevel, runLevel } from '@warriorjs/core';

import GameError from './GameError.js';
import Profile from './Profile.js';
import ProfileGenerator from './ProfileGenerator.js';
import Tower from './Tower.js';
import getWarriorNameSuggestions from './utils/getWarriorNameSuggestions.js';
import loadTowers from './loadTowers.js';
import printFailureLine from './ui/printFailureLine.js';
import printLevelReport from './ui/printLevelReport.js';
import printLevel from './ui/printLevel.js';
import printLine from './ui/printLine.js';
import printPlay from './ui/printPlay.js';
import printSeparator from './ui/printSeparator.js';
import printSuccessLine from './ui/printSuccessLine.js';
import printTowerReport from './ui/printTowerReport.js';
import printWarningLine from './ui/printWarningLine.js';
import printWelcomeHeader from './ui/printWelcomeHeader.js';
import requestChoice, { SEPARATOR } from './ui/requestChoice.js';
import requestConfirmation from './ui/requestConfirmation.js';
import requestInput from './ui/requestInput.js';

const gameDirectory = 'warriorjs';

/** Class representing a game. */
class Game {
  runDirectoryPath: string;
  practiceLevel: number | undefined;
  silencePlay: boolean;
  delay: number;
  assumeYes: boolean;
  gameDirectoryPath: string;
  towers!: Tower[];
  profile!: Profile;

  constructor(
    runDirectoryPath: string,
    practiceLevel: number | undefined,
    silencePlay: boolean,
    delay: number,
    assumeYes: boolean,
  ) {
    this.runDirectoryPath = runDirectoryPath;
    this.practiceLevel = practiceLevel;
    this.silencePlay = silencePlay;
    this.delay = delay * 1000;
    this.assumeYes = assumeYes;
    this.gameDirectoryPath = path.join(this.runDirectoryPath, gameDirectory);
  }

  async start(): Promise<void> {
    printWelcomeHeader();

    try {
      this.towers = loadTowers();

      this.profile = await this.loadProfile();

      if (this.profile.isEpic()) {
        await this.playEpicMode();
      } else {
        await this.playNormalMode();
      }
    } catch (err: any) {
      if (err instanceof GameError || err.code === 'InvalidPlayerCode') {
        printFailureLine(err.message);
      } else {
        throw err;
      }
    }
  }

  async loadProfile(): Promise<Profile> {
    const profile = Profile.load(this.runDirectoryPath, this.towers);
    if (profile) {
      return profile;
    }

    return this.chooseProfile();
  }

  async chooseProfile(): Promise<Profile> {
    const profiles = this.getProfiles();
    if (profiles.length) {
      const newProfileChoice = 'New profile';
      const profileChoices = [...profiles, SEPARATOR, newProfileChoice];
      const profile = await requestChoice('Choose a profile:', profileChoices);
      if (profile !== newProfileChoice) {
        return profile as Profile;
      }
    }

    return this.createProfile();
  }

  getProfiles(): Profile[] {
    const profileDirectoriesPaths = this.getProfileDirectoriesPaths();
    return profileDirectoriesPaths.map(profileDirectoryPath =>
      Profile.load(profileDirectoryPath, this.towers),
    ) as Profile[];
  }

  async createProfile(): Promise<Profile> {
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
    const tower = await requestChoice('Choose a tower:', towerChoices) as Tower;

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

  isExistingProfile(profile: Profile): boolean {
    const profileDirectoriesPaths = this.getProfileDirectoriesPaths();
    return profileDirectoriesPaths.some(
      profileDirectoryPath => profileDirectoryPath === profile.directoryPath,
    );
  }

  getProfileDirectoriesPaths(): string[] {
    this.ensureGameDirectory();
    const profileDirectoryPattern = path.join(this.gameDirectoryPath, '*');
    return globbySync(profileDirectoryPattern, { onlyDirectories: true });
  }

  ensureGameDirectory(): void {
    try {
      if (!fs.statSync(this.gameDirectoryPath).isDirectory()) {
        throw new GameError(
          'A file named warriorjs exists at this location. Please change the directory under which you are running warriorjs.',
        );
      }
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        throw err;
      }

      fs.mkdirSync(this.gameDirectoryPath);
    }
  }

  async playEpicMode(): Promise<void> {
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
        playing = await this.playLevel(levelNumber);
      }

      this.profile.updateEpicScore();
    }
  }

  async playNormalMode(): Promise<void> {
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

  async playLevel(levelNumber: number): Promise<boolean> {
    const { tower, warriorName, epic } = this.profile;
    const levelConfig = getLevelConfig(tower as any, levelNumber, warriorName, epic);

    const level = getLevel(levelConfig);
    printLevel(level);

    const playerCode = this.profile.readPlayerCode();
    const levelResult = runLevel(levelConfig!, playerCode as any);

    if (!this.silencePlay) {
      await printPlay(levelResult.events, this.delay);
    }

    printSeparator();

    if (!levelResult.passed) {
      printFailureLine(
        `Sorry, you failed level ${levelNumber}. Change your script and try again.`,
      );

      if ((levelConfig as any).clue && !this.profile.isShowingClue()) {
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

    const scoreParts = getLevelScore(levelResult, levelConfig as any);
    const totalScore = Object.values(scoreParts as unknown as Record<string, number>).reduce(
      (sum: number, value: number) => sum + value,
      0,
    );
    const grade = (totalScore * 1.0) / (levelConfig as any).aceScore;
    printLevelReport(this.profile, scoreParts as any, totalScore, grade);
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

  async requestNextLevel(): Promise<void> {
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

  prepareNextLevel(): void {
    this.profile.goToNextLevel();
    this.generateProfileFiles();
  }

  generateProfileFiles(): void {
    const { tower, levelNumber, warriorName, epic } = this.profile;
    const levelConfig = getLevelConfig(tower as any, levelNumber, warriorName, epic);
    const level = getLevel(levelConfig);
    new ProfileGenerator(this.profile, level).generate();
  }

  prepareEpicMode(): void {
    this.profile.enableEpicMode();
  }
}

export default Game;
