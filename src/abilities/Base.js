import { RELATIVE_DIRECTIONS } from '../Position';

class Base {
  constructor(unit) {
    this._unit = unit;
  }

  offset(direction, forward = 1, right = 0) {
    switch (direction) {
      case 'forward':
        return [forward, -right];
      case 'backward':
        return [-forward, right];
      case 'right':
        return [right, forward];
      case 'left':
        return [-right, -forward];
    }
  }

  getSpace(direction, forward = 1, right = 0) {
    return this._unit.getPosition().getRelativeSpace(...this.offset(direction, forward, right));
  }

  getUnit(direction, forward = 1, right = 0) {
    return this.getSpace(direction, forward, right).getUnit();
  }

  damage(receiver, amount) {
    receiver.takeDamage(amount);
    if (!receiver.isAlive()) {
      this._unit.earnPoints(receiver.getMaxHealth());
    }
  }

  getDescription() {
  }

  passTurn() {
    // Callback which is triggered every turn
  }

  verifyDirection(direction) {
    if (!RELATIVE_DIRECTIONS.includes(direction)) {
      throw new Error(`Unknown direction '${direction}'. Should be 'forward', 'backward', 'left' or 'right'.`);
    }
  }
}

export default Base;
