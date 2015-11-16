import path from 'path';
import fs from 'fs-extra';
import Promise from 'bluebird';
import Config from './Config';
import Game from './Game';
import Tower from './Tower';

class Profile {
  _towerPath = null;
  _warriorName = null;
  _score = 0;
  _epic = false;
  _epicScore = 0;
  _currentEpicScore = 0;
  _currentEpicGrades = {};
  _averageGrade = null;
  _abilities = {};
  _levelNumber = 0;
  _lastLevelNumber = null;
  _playerPath = null;

  getTowerPath() {
    return this._towerPath;
  }

  setTowerPath(towerPath) {
    this._towerPath = towerPath;
  }

  getWarriorName() {
    return this._warriorName;
  }

  setWarriorName(warriorName) {
    this._warriorName = warriorName;
  }

  getScore() {
    return this._score;
  }

  setScore(score) {
    this._score = score;
  }

  addScore(points) {
    this._score += points;
  }

  isEpic() {
    return this._epic;
  }

  getEpicScore() {
    return this._epicScore;
  }

  setEpicScore(score) {
    this._epicScore = score;
  }

  addEpicScore(points) {
    this._epicScore += points;
  }

  getCurrentEpicScore() {
    return this._currentEpicScore;
  }

  setCurrentEpicScore(score) {
    this._currentEpicScore = score;
  }

  addCurrentEpicScore(points) {
    this._currentEpicScore += points;
  }

  getCurrentEpicGrades() {
    return this._currentEpicGrades;
  }

  setCurrentEpicGrades(grades) {
    this._currentEpicGrades = grades;
  }

  getAverageGrade() {
    return this._averageGrade;
  }

  setAverageGrade(grade) {
    this._averageGrade = grade;
  }

  getAbilities() {
    return this._abilities;
  }

  addAbilities(abilities) {
    Object.assign(this._abilities, abilities);
  }

  getLevelNumber() {
    return this._levelNumber;
  }

  setLevelNumber(levelNumber) {
    this._levelNumber = levelNumber;
  }

  incLevelNumber() {
    this._levelNumber += 1;
  }

  getLastLevelNumber() {
    return this._lastLevelNumber;
  }

  setLastLevelNumber(levelNumber) {
    this._lastLevelNumber = levelNumber;
  }

  getPlayerPath() {
    return this._playerPath || path.join(Config.getPathPrefix(), 'warriorjs', this.getDirectoryName());
  }

  setPlayerPath(playerPath) {
    this._playerPath = playerPath;
  }

  getTower() {
    return new Tower(this.getTowerPath());
  }

  getDirectoryName() {
    const warriorName = this.getWarriorName();
    const towerName = this.getTower().getName();
    return `${warriorName}-${towerName}`.toLowerCase().replace(/[^a-z0-9]+/, '-');
  }

  toString() {
    const warriorName = this.getWarriorName();
    const towerName = this.getTower().getName();

    if (this.isEpic()) {
      return `${warriorName} - ${towerName} - first score ${this.getScore()} - epic score ${this.getEpicScoreWithGrade()}`;
    }

    return `${warriorName} - ${towerName} - level ${this.getLevelNumber()} - score ${this.getScore()}`;
  }

  /*
   * Game modes
   */

  enableEpicMode() {
    this._epic = true;
    this._epicScore = this._epicScore || 0;
    this._currentEpicScore = this._currentEpicScore || 0;
    this._lastLevelNumber = this._lastLevelNumber || this._levelNumber;
  }

  enableNormalMode() {
    this._epic = false;
    this._epicScore = 0;
    this._currentEpicScore = 0;
    this._currentEpicGrades = {};
    this._averageGrade = null;
    this._levelNumber = this._lastLevelNumber;
    this._lastLevelNumber = null;
  }

  /*
   * Score
   */

  calculateAverageGrade() {
    const grades = Object.values(this._currentEpicGrades);
    if (grades.length) {
      return grades.reduce((sum, value) => sum + value) / grades.length;
    }

    return null;
  }

  updateEpicScore() {
    if (this._currentEpicScore > this._epicScore) {
      this._epicScore = this._currentEpicScore;
      this._averageGrade = this.calculateAverageGrade();
    }
  }

  getEpicScoreWithGrade() {
    if (this._averageGrade) {
      return `${this.getEpicScore()} (${Game.getGradeLetter(this._averageGrade)})`;
    }

    return this.getEpicScore();
  }

  /*
   * I/O
   */

  encode() {
    return new Buffer(JSON.stringify(this)).toString('base64');
  }

  save() {
    this.updateEpicScore();
    if (this.isEpic()) {
      this._levelNumber = 0;
    }

    return fs.writeFileAsync(path.join(this.getPlayerPath(), '.profile'), this.encode());
  }

  static decode(encodedProfile) {
    try {
      return JSON.parse(new Buffer(encodedProfile, 'base64').toString());
    } catch (err) {
      throw new Error('Invalid .profile file. Try changing the directory under which you are running warriorjs.');
    }
  }

  static load(profilePath) {
    return fs.readFileAsync(profilePath, 'utf8')
      .then(encodedProfile => {
        const profile = Object.assign(new Profile(), Profile.decode(encodedProfile));
        profile.setPlayerPath(path.dirname(profilePath));
        return Promise.resolve(profile);
      });
  }
}

export default Profile;
