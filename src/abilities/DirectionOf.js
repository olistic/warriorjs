import Base from './Base';

class DirectionOf extends Base {
  getDescription() {
    return 'Pass a Space as an argument, and the direction (\'left\', \'right\', \'forward\', \'backward\') to that space will be returned.';
  }

  perform(space) {
    return this._unit.getPosition().getRelativeDirectionOf(space);
  }
}

export default DirectionOf;
