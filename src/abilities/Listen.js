import _ from 'lodash';
import Base from './Base';

class Listen extends Base {
  getDescription() {
    return 'Returns an array of all spaces which have units in them.';
  }

  perform() {
    return _.compact(this._unit.getPosition().getFloor().getUnits().map((unit) => {
      if (unit !== this._unit) {
        return unit.getPosition().getSpace().getPlayerObject();
      }
    }));
  }
}

export default Listen;
