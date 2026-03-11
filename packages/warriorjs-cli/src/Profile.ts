import fs from 'node:fs';
import path from 'node:path';
import getGradeLetter from '@warriorjs/helper-get-grade-letter';

import GameError from './GameError.js';
import type Tower from './Tower.js';

const profileFile = '.profile';
const playerCodeFileJs = 'Player.js';
const playerCodeFileTs = 'Player.ts';
const readmeFile = 'README.md';

/** Class representing a profile. */
class Profile {
  warriorName: string;
  tower: Tower;
  directoryPath: string;
  language: 'javascript' | 'typescript';
  levelNumber: number;
  score: number;
  clue: boolean;
  epic: boolean;
  epicScore: number;
  averageGrade: number | null;
  currentEpicScore: number;
  currentEpicGrades: Record<number, number>;
  [key: string]: unknown;

  static load(profileDirectoryPath: string, towers: Tower[]): Profile | null {
    if (!Profile.isProfileDirectory(profileDirectoryPath)) {
      return null;
    }

    const profileFilePath = path.join(profileDirectoryPath, profileFile);
    const encodedProfile = Profile.read(profileFilePath);
    if (!encodedProfile) {
      return null;
    }

    const decodedProfile = Profile.decode(encodedProfile);
    const {
      warriorName,
      towerId,
      towerName, // TODO: Remove before v1.0.0.
      directoryPath, // TODO: Remove before v1.0.0.
      currentEpicScore, // TODO: Remove before v1.0.0.
      currentEpicGrades, // TODO: Remove before v1.0.0.
      ...profileData
    } = decodedProfile;

    const towerKey = towerId || towerName; // Support legacy profiles.
    const profileTower = towers.find((tower) => tower.id === towerKey);
    if (!profileTower) {
      throw new GameError(`Unable to find tower '${towerKey}', make sure it is available.`);
    }

    const profile = new Profile(warriorName as string, profileTower, profileDirectoryPath);
    return Object.assign(profile, profileData);
  }

  static isProfileDirectory(profileDirectoryPath: string): boolean {
    const profileFilePath = path.join(profileDirectoryPath, profileFile);
    const playerCodeFilePathJs = path.join(profileDirectoryPath, playerCodeFileJs);
    const playerCodeFilePathTs = path.join(profileDirectoryPath, playerCodeFileTs);

    const fileExists = (p: string) => {
      try {
        return fs.statSync(p).isFile();
      } catch {
        return false;
      }
    };

    return (
      fileExists(profileFilePath) &&
      (fileExists(playerCodeFilePathJs) || fileExists(playerCodeFilePathTs))
    );
  }

  static read(profileFilePath: string): string | null {
    try {
      return fs.readFileSync(profileFilePath, 'utf8');
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        return null;
      }

      throw err;
    }
  }

  static decode(encodedProfile: string): Record<string, unknown> {
    try {
      return JSON.parse(Buffer.from(encodedProfile, 'base64').toString());
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new GameError(
          'Invalid .profile file. Try changing the directory under which you are running warriorjs.',
        );
      }

      throw err;
    }
  }

  constructor(
    warriorName: string,
    tower: Tower,
    directoryPath: string,
    language: 'javascript' | 'typescript' = 'javascript',
  ) {
    this.warriorName = warriorName;
    this.tower = tower;
    this.directoryPath = directoryPath;
    this.language = language;
    this.levelNumber = 0;
    this.score = 0;
    this.clue = false;
    this.epic = false;
    this.epicScore = 0;
    this.averageGrade = null;
    this.currentEpicScore = 0;
    this.currentEpicGrades = {};
  }

  makeProfileDirectory(): void {
    fs.mkdirSync(this.directoryPath);
  }

  readPlayerCode(): string | null {
    try {
      return fs.readFileSync(this.getPlayerCodeFilePath(), 'utf8');
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        return null;
      }

      throw err;
    }
  }

  getPlayerCodeFilePath(): string {
    const playerCodeFile = this.language === 'typescript' ? playerCodeFileTs : playerCodeFileJs;
    return path.join(this.directoryPath, playerCodeFile);
  }

  getReadmeFilePath(): string {
    return path.join(this.directoryPath, readmeFile);
  }

  goToNextLevel(): void {
    this.levelNumber += 1;
    this.clue = false;
    this.save();
  }

  requestClue(): void {
    this.clue = true;
    this.save();
  }

  isShowingClue(): boolean {
    return this.clue;
  }

  enableEpicMode(): void {
    this.epic = true;
    this.save();
  }

  isEpic(): boolean {
    return this.epic;
  }

  tallyPoints(levelNumber: number, totalScore: number, grade?: number): void {
    if (this.isEpic()) {
      this.currentEpicGrades[levelNumber] = grade!;
      this.currentEpicScore += totalScore;
    } else {
      this.score += totalScore;
    }
  }

  getEpicScoreWithGrade(): string {
    if (this.averageGrade) {
      return `${this.epicScore} (${getGradeLetter(this.averageGrade)})`;
    }

    return this.epicScore.toString();
  }

  updateEpicScore(): void {
    if (this.currentEpicScore > this.epicScore) {
      this.epicScore = this.currentEpicScore;
      this.averageGrade = this.calculateAverageGrade();
    }

    this.save();
  }

  calculateAverageGrade(): number | null {
    const grades = Object.values(this.currentEpicGrades);
    if (!grades.length) {
      return null;
    }

    return grades.reduce((sum, value) => sum + value) / grades.length;
  }

  save(): void {
    fs.writeFileSync(this.getProfileFilePath(), this.encode());
  }

  getProfileFilePath(): string {
    return path.join(this.directoryPath, profileFile);
  }

  encode(): string {
    return Buffer.from(JSON.stringify(this)).toString('base64');
  }

  toJSON(): Record<string, unknown> {
    return {
      warriorName: this.warriorName,
      towerId: this.tower.id,
      language: this.language,
      levelNumber: this.levelNumber,
      clue: this.clue,
      epic: this.epic,
      score: this.score,
      epicScore: this.epicScore,
      averageGrade: this.averageGrade,
    };
  }

  toString(): string {
    let result = `${this.warriorName} - ${this.tower}`;
    if (this.isEpic()) {
      result += ` - first score ${this.score} - epic score ${this.getEpicScoreWithGrade()}`;
    } else {
      result += ` - level ${this.levelNumber} - score ${this.score}`;
    }

    return result;
  }
}

export default Profile;
