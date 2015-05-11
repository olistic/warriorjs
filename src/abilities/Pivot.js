import Base from './Base';

const ROTATION_DIRECTIONS = ['forward', 'right', 'backward', 'left'];

class Pivot extends Base {
  getDescription() {
    return 'Rotate left, right or backward (default).';
  }

  perform(direction = 'backward') {
    this.verifyDirection(direction);
    this._unit.getPosition().rotate(ROTATION_DIRECTIONS.indexOf(direction));
    this._unit.say(`pivots ${direction}`);
  }
}

export default Pivot;
