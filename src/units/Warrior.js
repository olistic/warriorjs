import chalk from 'chalk';
import Base from './Base';

class Warrior extends Base {
  constructor() {
    super();
    this._score = 0;
  }

  playTurn(turn) {
    this.getPlayer().playTurn(turn);
  }

  performTurn() {
    if (!this._currentTurn.getAction()) {
      this.say('does nothing');
    }

    super.performTurn();
  }

  getPlayer() {
    this._player = this._player || new global.Player();
    return this._player;
  }

  earnPoints(points) {
    this._score += points;
    this.say(`earns ${points} points`);
  }

  getAttackPower() {
    return 5;
  }

  getShootPower() {
    return 3;
  }

  getMaxHealth() {
    return 20;
  }

  getName() {
    if (this._name && this._name.length) {
      return this._name;
    }

    return 'Warrior';
  }

  setName(name) {
    this._name = name;
  }

  getScore() {
    return this._score;
  }

  getCharacter() {
    return this.style('@');
  }

  style(str) {
    return chalk.blue(str);
  }
}

export default Warrior;
