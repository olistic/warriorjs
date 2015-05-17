import Base from './Base';

class DistanceOf extends Base {
  getDescription() {
    return 'Pass a Space as an argument, and it will return an integer representing the distance to that space.';
  }

  perform(space) {
    return this._unit.getPosition().getDistanceOf(space);
  }
}

export default DistanceOf;
