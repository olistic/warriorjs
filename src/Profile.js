import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import Config from './Config';
import Tower from './Tower';
import Level from './Level';

class Profile {
  constructor() {
    this._towerPath = null;
    this._warriorName = null;
    this._score = 0;
    this._currentEpicScore = 0;
    this._currentEpicGrades = {};
    this._epicScore = 0;
    this._averageGrade = null;
    this._actions = [];
    this._senses = [];
    this._levelNumber = 0;
    this._lastLevelNumber = null;
    this._playerPath = null;
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

  getAverageGrade() {
    return this._averageGrade;
  }

  setAverageGrade(grade) {
    this._averageGrade = grade;
  }

  getCurrentEpicGrades() {
    return this._currentEpicGrades;
  }

  setCurrentEpicGrades(grades) {
    this._currentEpicGrades = grades;
  }

  getActions() {
    return this._actions;
  }

  setActions(actions) {
    this._actions = actions;
  }

  getSenses() {
    return this._senses;
  }

  setSenses(senses) {
    this._senses = senses;
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

  getPlayerPath() {
    return this._playerPath || path.join(Config.getPathPrefix(), 'warriorjs', this.getDirectoryName());
  }

  setPlayerPath(playerPath) {
    this._playerPath = playerPath;
  }

  encode() {
    return new Buffer(JSON.stringify(this)).toString('base64');
  }

  save() {
    this.updateEpicScore();
    if (this.isEpic()) {
      this._levelNumber = 0;
    }

    fs.writeFileSync(path.join(this.getPlayerPath(), '/.profile'), this.encode());
  }

  static decode(str) {
    try {
      return JSON.parse(new Buffer(str, 'base64').toString());
    } catch (err) {
      throw new Error('Invalid .profile file. Try changing the directory under you are running warriorjs.');
    }
  }

  static load(profilePath) {
    let player = Object.assign(new Profile(), Profile.decode(fs.readFileSync(profilePath, 'utf8')));
    player.setPlayerPath(path.dirname(profilePath));
    return player;
  }

  getDirectoryName() {
    return [this.getWarriorName().toLowerCase().replace(/[^a-z0-9]+/, '-'), this.getTower().getName()].join('-');
  }

  toString() {
    if (this.isEpic()) {
      return [this.getWarriorName(), this.getTower().getName(), `first score ${this.getScore()}`, `epic score ${this.getEpicScoreWithGrade()}`].join(' - ');
    }

    return [this.getWarriorName(), this.getTower().getName(), `level ${this.getLevelNumber()}`, `score ${this.getScore()}`].join(' - ');
  }

  getEpicScoreWithGrade() {
    if (this._averageGrade) {
      return `${this.getEpicScore()} (${Level.getGradeLetter(this._averageGrade)})`;
    }

    return this.getEpicScore();
  }

  getTower() {
    return new Tower(path.basename(this.getTowerPath()));
  }

  getCurrentLevel() {
    return new Level(this, this.getLevelNumber());
  }

  getNextLevel() {
    return new Level(this, this.getLevelNumber() + 1);
  }

  addActions(actions) {
    this.setActions(_.union(this.getActions(), actions));
  }

  addSenses(senses) {
    this.setSenses(_.union(this.getSenses(), senses));
  }

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

  isEpic() {
    return this._epic;
  }

  hasLevelAfterEpic() {
    if (this._lastLevelNumber) {
      return new Level(this, this._lastLevelNumber + 1).exists();
    }

    return false;
  }

  updateEpicScore() {
    if (this._currentEpicScore > this._epicScore) {
      this._epicScore = this._currentEpicScore;
      this._averageGrade = this.calculateAverageGrade();
    }
  }

  calculateAverageGrade() {
    if (Object.keys(this._currentEpicGrades).length) {
      return _.values(this._currentEpicGrades).reduce((sum, value) => sum + value) / Object.keys(this._currentEpicGrades).length;
    }

    return null;
  }
}

export default Profile;
