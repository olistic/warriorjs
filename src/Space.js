import _ from 'lodash';
import Warrior from './units/Warrior';

class Space {
  constructor(floor, x, y) {
    this._floor = floor;
    this._x = x;
    this._y = y;
  }

  isWall() {
    return this._floor.isOutOfBounds(this._x, this._y);
  }

  isWarrior() {
    return this.getUnit() instanceof Warrior;
  }

  isPlayer() {
    return this.isWarrior();
  }

  isEnemy() {
    return this.getUnit() && !this.isPlayer() && !this.isCaptive();
  }

  isCaptive() {
    return this.getUnit() && this.getUnit().isBound();
  }

  isEmpty() {
    return !this.getUnit() && !this.isWall();
  }

  isStairs() {
    return _.isEqual(this._floor.getStairsLocation(), this.getLocation());
  }

  getUnit() {
    return this._floor.getUnit(this._x, this._y);
  }

  getLocation() {
    return [this._x, this._y];
  }

  getCharacter() {
    if (this.getUnit()) {
      return this.getUnit().getCharacter();
    } else if (this.isStairs()) {
      return '>';
    } else {
      return ' ';
    }
  }

  toString() {
    if (this.getUnit()) {
      return this.getUnit().toString();
    } else if (this.isWall()) {
      return 'wall';
    } else {
      return 'nothing';
    }
  }
}

export default Space;
