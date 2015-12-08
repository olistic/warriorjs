import path from 'path';
import fs from 'fs-extra';
import Promise from 'bluebird';
import Config from './Config';
import Game from './Game';
import Tower from './Tower';

export default class Profile {
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

  get towerPath() {
    return this._towerPath;
  }

  set towerPath(towerPath) {
    this._towerPath = towerPath;
  }

  get warriorName() {
    return this._warriorName;
  }

  set warriorName(warriorName) {
    this._warriorName = warriorName;
  }

  get score() {
    return this._score;
  }

  set score(score) {
    this._score = score;
  }

  get epicScore() {
    return this._epicScore;
  }

  set epicScore(score) {
    this._epicScore = score;
  }

  get currentEpicScore() {
    return this._currentEpicScore;
  }

  set currentEpicScore(score) {
    this._currentEpicScore = score;
  }

  get currentEpicGrades() {
    return this._currentEpicGrades;
  }

  set currentEpicGrades(grades) {
    this._currentEpicGrades = grades;
  }

  get averageGrade() {
    return this._averageGrade;
  }

  set averageGrade(grade) {
    this._averageGrade = grade;
  }

  get epicScoreWithGrade() {
    return this.averageGrade ?
      `${this.epicScore} (${Game.getGradeLetter(this.averageGrade)})` :
      this.epicScore;
  }

  get abilities() {
    return this._abilities;
  }

  get levelNumber() {
    return this._levelNumber;
  }

  set levelNumber(levelNumber) {
    this._levelNumber = levelNumber;
  }

  get lastLevelNumber() {
    return this._lastLevelNumber;
  }

  set lastLevelNumber(levelNumber) {
    this._lastLevelNumber = levelNumber;
  }

  get playerPath() {
    return this._playerPath || path.join(Config.pathPrefix, 'warriorjs', this.directoryName);
  }

  set playerPath(playerPath) {
    this._playerPath = playerPath;
  }

  get tower() {
    return new Tower(this.towerPath);
  }

  get directoryName() {
    return `${this.warriorName}-${this.tower.name}`.toLowerCase().replace(/[^a-z0-9]+/, '-');
  }

  addAbilities(abilities = {}) {
    Object.assign(this.abilities, abilities);
  }

  isEpic() {
    return this._epic;
  }

  enableEpicMode() {
    this._epic = true;
    this.epicScore = this.epicScore || 0;
    this.currentEpicScore = this.currentEpicScore || 0;
    this.lastLevelNumber = this.lastLevelNumber || this.levelNumber;
  }

  enableNormalMode() {
    this._epic = false;
    this.epicScore = 0;
    this.currentEpicScore = 0;
    this.currentEpicGrades = {};
    this.averageGrade = null;
    this.levelNumber = this.lastLevelNumber;
    this.lastLevelNumber = null;
  }

  calculateAverageGrade() {
    const grades = Object.values(this.currentEpicGrades);
    return grades.length ?
      grades.reduce((sum, value) => sum + value) / grades.length :
      null;
  }

  updateEpicScore() {
    if (this.currentEpicScore > this.epicScore) {
      this.epicScore = this.currentEpicScore;
      this.averageGrade = this.calculateAverageGrade();
    }
  }

  encode() {
    return new Buffer(JSON.stringify(this)).toString('base64');
  }

  save() {
    this.updateEpicScore();
    if (this.isEpic()) {
      this.levelNumber = 0;
    }

    return fs.writeFileAsync(path.join(this.playerPath, '.profile'), this.encode());
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
        profile.playerPath = path.dirname(profilePath);
        return Promise.resolve(profile);
      });
  }

  toString() {
    return this.isEpic() ?
      `${this.warriorName} - ${this.tower.name} - first score ${this.score} - epic score ${this.epicScoreWithGrade}` :
      `${this.warriorName} - ${this.tower.name} - level ${this.levelNumber} - score ${this.score}`;
  }
}
