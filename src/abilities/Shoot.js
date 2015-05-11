import _ from 'lodash';
import Base from './Base';

class Shoot extends Base {
  getDescription() {
    return 'Shoot your bow & arrow in given direction (forward by default).';
  }

  perform(direction = 'forward') {
    this.verifyDirection(direction);
    const receiver = _.first(_.compact(this.getUnits(direction, [1, 2, 3])));
    if (receiver) {
      this._unit.say(`shoots ${direction} and hits ${receiver}`);
      this.damage(receiver, this._unit.getShootPower());
    } else {
      this._unit.say(`shoots ${direction} and hits nothing`);
    }
  }

  getUnits(direction, range) {
    return range.map((n) => this.getUnit(direction, n));
  }
}

export default Shoot;
