const DIRECTIONS = ['north', 'east', 'south', 'west'];
const RELATIVE_DIRECTIONS = ['forward', 'right', 'backward', 'left'];

class Position {
  constructor(floor, x, y, direction) {
    this._floor = floor;
    this._x = x;
    this._y = y;
    this._directionIndex = DIRECTIONS.indexOf(direction || 'north');
  }

  getFloor() {
    return this._floor;
  }

  isAt(x, y) {
    return this._x === x && this._y === y;
  }

  getDirection() {
    return DIRECTIONS[this._directionIndex];
  }

  rotate(amount) {
    this._directionIndex += amount;
    while (this._directionIndex > 3) this._directionIndex -= 4;
    while (this._directionIndex < 0) this._directionIndex += 4;
  }

  getRelativeSpace(forward, right = 0) {
    return this._floor.getSpace(...this.translateOffset(forward, right));
  }

  getSpace() {
    return this._floor.getSpace(this._x, this._y);
  }

  move(forward, right = 0) {
    [this._x, this._y] = this.translateOffset(forward, right);
  }

  getDistanceFromStairs() {
    return this.getDistanceOf(this._floor.getStairsSpace());
  }

  getDistanceOf(space) {
    const [spaceX, spaceY] = space.getLocation();
    return Math.abs(this._x - spaceX) + Math.abs(this._y - spaceY);
  }

  getRelativeDirectionOfStairs() {
    return this.getRelativeDirectionOf(this._floor.getStairsSpace());
  }

  getRelativeDirectionOf(space) {
    return this.getRelativeDirection(this.getDirectionOf(space));
  }

  getDirectionOf(space) {
    const [spaceX, spaceY] = space.getLocation();
    if (Math.abs(this._x - spaceX) > Math.abs(this._y - spaceY)) {
      return spaceX > this._x ? 'east' : 'west';
    }

    return spaceY > this._y ? 'south' : 'north';
  }

  getRelativeDirection(direction) {
    let offset = DIRECTIONS.indexOf(direction) - this._directionIndex;
    while (offset > 3) offset -= 4;
    while (offset < 0) offset += 4;
    return RELATIVE_DIRECTIONS[offset];
  }

  translateOffset(forward, right) {
    switch (this.getDirection()) {
      case 'north':
        return [this._x + right, this._y - forward];
      case 'east':
        return [this._x + forward, this._y + right];
      case 'south':
        return [this._x - right, this._y + forward];
      case 'west':
        return [this._x - forward, this._y - right];
    }
  }
}

export default Position;
export { DIRECTIONS, RELATIVE_DIRECTIONS };
