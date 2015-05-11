import Base from './Base';

class Warrior extends Base {
  constructor() {
    super();
    // TODO: make score dynamic
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
    this._player = this._player || new Player();
    return this._player;
  }

  earnPoints(points) {
    this._score += points;
    this.say(`earns ${points} points`);
  }

  getAttackPower() {
    return 5;
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
    return '@';
  }
}

export default Warrior;
