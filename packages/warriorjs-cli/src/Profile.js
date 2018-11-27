import fs from 'fs';
import path from 'path';

import getGradeLetter from '@warriorjs/helper-get-grade-letter';

import GameError from './GameError';

const profileFile = '.profile';
const playerCodeFile = 'Player.js';
const readmeFile = 'README.md';

/** Class representing a profile. */
class Profile {
  /**
   * Loads a profile from a profile directory.
   *
   * @param {string} profileDirectoryPath The path to the profile directory.
   * @param {Tower[]} towers The available towers.
   *
   * @returns {Profile} The loaded profile.
   */
  static load(profileDirectoryPath, towers) {
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
    const profileTower = towers.find(tower => tower.id === towerKey);
    if (!profileTower) {
      throw new GameError(
        `Unable to find tower '${towerKey}', make sure it is available.`,
      );
    }

    const profile = new Profile(
      warriorName,
      profileTower,
      profileDirectoryPath,
    );
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
  static isProfileDirectory(profileDirectoryPath) {
    const profileFilePath = path.join(profileDirectoryPath, profileFile);
    const playerCodeFilePath = path.join(profileDirectoryPath, playerCodeFile);
    try {
      return (
        fs.statSync(profileFilePath).isFile() &&
        fs.statSync(playerCodeFilePath).isFile()
      );
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      }

      throw err;
    }
  }

  /**
   * Reads a profile file.
   *
   * @param {string} profileFilePath The path to the profile file.
   *
   * @returns {string} The contents of the profile file.
   */
  static read(profileFilePath) {
    try {
      return fs.readFileSync(profileFilePath, 'utf8');
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
   * @param {Tower} tower The tower.
   * @param {string} directoryPath The path to the directory of the profile.
   */
  constructor(warriorName, tower, directoryPath) {
    this.warriorName = warriorName;
    this.tower = tower;
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
   * Creates the profile directory.
   */
  makeProfileDirectory() {
    fs.mkdirSync(this.directoryPath);
  }

  /**
   * Reads the player code file.
   *
   * @returns {string} The player code.
   */
  readPlayerCode() {
    try {
      return fs.readFileSync(this.getPlayerCodeFilePath(), 'utf8');
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
  goToNextLevel() {
    this.levelNumber += 1;
    this.clue = false;
    this.save();
  }

  /**
   * Requests the clue to be shown.
   */
  requestClue() {
    this.clue = true;
    this.save();
  }

  /**
   * Checks if the clue is being shown.
   *
   * @returns {boolean} Whether the clue is being shown or not.
   */
  isShowingClue() {
    return this.clue;
  }

  /**
   * Enables epic mode and saves the profile.
   */
  enableEpicMode() {
    this.epic = true;
    this.save();
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
   * @param {Object} score The score of the play.
   */
  tallyPoints(levelNumber, totalScore, grade) {
    if (this.isEpic()) {
      this.currentEpicGrades[levelNumber] = grade;
      this.currentEpicScore += totalScore;
    } else {
      this.score += totalScore;
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
  updateEpicScore() {
    if (this.currentEpicScore > this.epicScore) {
      this.epicScore = this.currentEpicScore;
      this.averageGrade = this.calculateAverageGrade();
    }

    this.save();
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
  save() {
    fs.writeFileSync(this.getProfileFilePath(), this.encode());
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
   * Customizes the JSON stringification behavior of the profile.
   *
   * @returns {Object} The value to be serialized.
   */
  toJSON() {
    return {
      warriorName: this.warriorName,
      towerId: this.tower.id,
      levelNumber: this.levelNumber,
      clue: this.clue,
      epic: this.epic,
      score: this.score,
      epicScore: this.epicScore,
      averageGrade: this.averageGrade,
    };
  }

  /**
   * Returns the string representation of this profile.
   *
   * @returns {string} The string representation.
   */
  toString() {
    let result = `${this.warriorName} - ${this.tower}`;
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
