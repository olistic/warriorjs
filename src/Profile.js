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
    this._actions = [];
    this._senses = [];
    this._levelNumber = 0;
    this._lastLevelNumber = null;
    this._playerPath = null;
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

  getScore() {
    return this._score;
  }

  setScore(score) {
    this._score = score;
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

  getLastLevelNumber() {
    return this._lastLevelNumber;
  }

  setLastLevelNumber(lastLevelNumber) {
    this._lastLevelNumber = lastLevelNumber;
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
    fs.writeFileSync(path.join(this.getPlayerPath(), '/.profile'), this.encode());
  }

  static decode(str) {
    return JSON.parse(new Buffer(str, 'base64').toString());
  }

  static load(profilePath) {
    let player = _.assign(new Profile(), Profile.decode(fs.readFileSync(profilePath, 'utf8')));
    player.setPlayerPath(path.dirname(profilePath));
    return player;
  }

  getDirectoryName() {
    return [this.getWarriorName().toLowerCase().replace(/[^a-z0-9]+/, '-'), this.getTower().getName()].join('-');
  }

  toString() {
    return [this.getWarriorName(), this.getTower().getName(), `level ${this.getLevelNumber()}`, `score ${this.getScore()}`].join(' - ');
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
}

export default Profile;
