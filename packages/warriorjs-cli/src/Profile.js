import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import makeDir from 'make-dir';
import pathType from 'path-type';

import GameError from './GameError';
import getGradeLetter from './utils/getGradeLetter';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const profileFile = '.profile';
const playerCodeFile = 'Player.js';
const readmeFile = 'README.md';

/** Class representing a profile. */
class Profile {
  /**
   * Loads a profile from a profile directory.
   *
   * @param {string} profileDirectoryPath The path to the profile directory.
   *
   * @returns {Profile} The loaded profile.
   */
  static async load(profileDirectoryPath) {
    const isProfileDirectory = await Profile.isProfileDirectory(
      profileDirectoryPath,
    );
    if (!isProfileDirectory) {
      return null;
    }

    const profileFilePath = path.join(profileDirectoryPath, profileFile);
    const encodedProfile = await Profile.read(profileFilePath);
    if (!encodedProfile) {
      return null;
    }

    const decodedProfile = Profile.decode(encodedProfile);
    const {
      warriorName,
      towerName,
      directoryPath,
      ...profileData
    } = decodedProfile;
    const profile = new Profile(warriorName, towerName, profileDirectoryPath);
    return Object.assign(profile, profileData);
  }

  /**
   * Checks if the given path is a profile directory.
   *
   * For a directory to be considered a profile directory, it must contain two
   * files: `.profile` and `Player.js`.
   *
   * @param {string} profileDirectoryPath The path to validate.
   *
   * @returns {boolean} Whether the path is a profile directory or not.
   */
  static async isProfileDirectory(profileDirectoryPath) {
    const profileFilePath = path.join(profileDirectoryPath, profileFile);
    const profileFileExists = await pathType.file(profileFilePath);

    const playerCodeFilePath = path.join(profileDirectoryPath, playerCodeFile);
    const playerCodeFileExists = await pathType.file(playerCodeFilePath);

    return playerCodeFileExists && profileFileExists;
  }

  /**
   * Reads a profile file.
   *
   * @param {string} profileFilePath The path to the profile file.
   *
   * @returns {string} The contents of the profile file.
   */
  static async read(profileFilePath) {
    try {
      return await readFileAsync(profileFilePath, 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        return null;
      }

      throw err;
    }
  }

  /**
   * Decodes an encoded profile.
   *
   * @param {string} encodedProfile The encoded profile.
   *
   * @returns {Object} The decoded profile.
   */
  static decode(encodedProfile) {
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

  /**
   * Creates a profile.
   *
   * @param {string} warriorName The name of the warrior.
   * @param {string} towerName The name of the tower.
   * @param {string} directoryPath The path to the directory of the profile.
   */
  constructor(warriorName, towerName, directoryPath) {
    this.warriorName = warriorName;
    this.towerName = towerName;
    this.directoryPath = directoryPath;
    this.levelNumber = 0;
    this.score = 0;
    this.clue = false;
    this.epic = false;
    this.epicScore = 0;
    this.averageGrade = null;
    this.currentEpicScore = 0;
    this.currentEpicGrades = {};
  }

  /**
   * Ensures the profile directory exists.
   */
  async ensureProfileDirectory() {
    await makeDir(this.directoryPath);
  }

  /**
   * Reads the player code file.
   *
   * @returns {string} The player code.
   */
  async readPlayerCode() {
    try {
      return await readFileAsync(this.getPlayerCodeFilePath(), 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        return null;
      }

      throw err;
    }
  }

  /**
   * Returns the path to the player code file.
   *
   * @returns {string} The path to the player code file.
   */
  getPlayerCodeFilePath() {
    return path.join(this.directoryPath, playerCodeFile);
  }

  /**
   * Returns the path to the README file.
   *
   * @returns {string} The path to the README file.
   */
  getReadmeFilePath() {
    return path.join(this.directoryPath, readmeFile);
  }

  /**
   * Increments the level by one and saves the profile.
   */
  async goToNextLevel() {
    this.levelNumber += 1;
    this.clue = false;
    await this.save();
  }

  /**
   * Request the clue to be shown.
   */
  async requestClue() {
    this.clue = true;
    await this.save();
  }

  /**
   * Check if the clue is being shown.
   *
   * @returns {boolean} Whether the clue is being shown or not.
   */
  isShowingClue() {
    return this.clue;
  }

  /**
   * Enables epic mode and saves the profile.
   */
  async enableEpicMode() {
    this.epic = true;
    await this.save();
  }

  /**
   * Checks if the profile is in epic mode.
   *
   * @returns {boolean} Whether the profile is in epic mode or not.
   */
  isEpic() {
    return this.epic;
  }

  /**
   * Calculates the total score and secondary scores after playing a level.
   *
   * @param {number} levelNumber The number of the level.
   * @param {number} score The score of the level.
   * @param {number} aceScore The ace score of the level.
   */
  tallyPoints(levelNumber, score, aceScore) {
    if (this.isEpic()) {
      if (aceScore) {
        this.currentEpicGrades[levelNumber] = score * 1.0 / aceScore;
      }

      this.currentEpicScore += score;
    } else {
      this.score += score;
    }
  }

  /**
   * Returns the epic score with corresponding grade letter.
   *
   * If the average grade cannot yet be calculated, returns only the epic score.
   *
   * @returns {string} The epic score with grade.
   */
  getEpicScoreWithGrade() {
    if (this.averageGrade) {
      return `${this.epicScore} (${getGradeLetter(this.averageGrade)})`;
    }

    return this.epicScore.toString();
  }

  /**
   * Updates the epic score and saves the profile.
   */
  async updateEpicScore() {
    if (this.currentEpicScore > this.epicScore) {
      this.epicScore = this.currentEpicScore;
      this.averageGrade = this.calculateAverageGrade();
    }

    await this.save();
  }

  /**
   * Calculates the average of all current level grades in epic mode.
   *
   * @returns {number} The average grade.
   */
  calculateAverageGrade() {
    const grades = Object.values(this.currentEpicGrades);
    if (!grades.length) {
      return null;
    }

    return grades.reduce((sum, value) => sum + value) / grades.length;
  }

  /**
   * Saves the profile to the profile file.
   */
  async save() {
    await writeFileAsync(this.getProfileFilePath(), this.encode());
  }

  /**
   * Returns the path to the profile file.
   *
   * @returns {string} The path to the profile file.
   */
  getProfileFilePath() {
    return path.join(this.directoryPath, profileFile);
  }

  /**
   * Encodes the JSON representation of the profile in base64.
   *
   * @returns {string} The encoded profile.
   */
  encode() {
    return Buffer.from(JSON.stringify(this)).toString('base64');
  }

  /**
   * Returns the string representation of this profile.
   *
   * @returns {string} The string representation.
   */
  toString() {
    let result = `${this.warriorName} - ${this.towerName}`;
    if (this.isEpic()) {
      result += ` - first score ${
        this.score
      } - epic score ${this.getEpicScoreWithGrade()}`;
    } else {
      result += ` - level ${this.levelNumber} - score ${this.score}`;
    }

    return result;
  }
}

export default Profile;
