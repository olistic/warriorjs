import Base from './Base';

class Walk extends Base {
  getDescription() {
    return 'Move in the given direction (forward by default).';
  }

  perform(direction = 'forward') {
    this.verifyDirection(direction);
    if (this._unit.getPosition()) {
      this._unit.say(`walks ${direction}`);
      if (this.getSpace(direction).isEmpty()) {
        this._unit.getPosition().move(...this.offset(direction));
      } else {
        this._unit.say(`bumps into ${this.getSpace(direction)}`);
      }
    }
  }
}

export default Walk;
