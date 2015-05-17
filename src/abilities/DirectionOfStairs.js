import Base from './Base';

class DirectionOf extends Base {
  getDescription() {
    return 'Returns the direction (\'left\', \'right\', \'forward\', \'backward\') the stairs are from your location.';
  }

  perform() {
    return this._unit.getPosition().getRelativeDirectionOfStairs();
  }
}

export default DirectionOf;
