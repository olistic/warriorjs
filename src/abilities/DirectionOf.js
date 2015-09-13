import Base from './Base';
import { originalSpaces } from '../Space';

class DirectionOf extends Base {
  getDescription() {
    return 'Pass a Space as an argument, and the direction (\'left\', \'right\', \'forward\', \'backward\') to that space will be returned.';
  }

  perform(space) {
    const originalSpace = space.isPlayerObject ? originalSpaces.get(space) : space;
    return this._unit.getPosition().getRelativeDirectionOf(originalSpace);
  }
}

export default DirectionOf;
