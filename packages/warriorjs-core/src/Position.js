import {
  getAbsoluteDirection,
  getAbsoluteOffset,
  getDirectionOfLocation,
  getDistanceOfLocation,
  getRelativeDirection,
  rotateRelativeOffset,
  translateLocation,
  verifyAbsoluteDirection,
} from '@warriorjs/geography';

/** Class representing a position. */
class Position {
  /**
   * Creates a position.
   *
   * A position is defined by a location (where the object is in reference to
   * the floor) and an orientation (which way the object is facing).
   *
   * @param {Floor} floor The floor.
   * @param {number[]} location The location as [x, y].
   * @param {string} orientation The orientation.
   */
  constructor(floor, location, orientation) {
    verifyAbsoluteDirection(orientation);
    this.floor = floor;
    this.location = location;
    this.orientation = orientation;
  }

  /**
   * Checks if the position is at a given location.
   *
   * @param {number[]} location The location as [x, y].
   *
   * @returns {boolean} Whether the position is at the given location or not.
   */
  isAt([x, y]) {
    const [locationX, locationY] = this.location;
    return locationX === x && locationY === y;
  }

  /**
   * Returns the space located at this position.
   *
   * @returns {Space} The space located at this position.
   */
  getSpace() {
    return this.floor.getSpaceAt(this.location);
  }

  /**
   * Returns the space located at the given offset.
   *
   * @param {string} direction The direction.
   * @param {number[]} relativeOffset The relative offset.
   *
   * @returns {Space} The space located at the given offset.
   */
  getRelativeSpace(direction, relativeOffset) {
    const offset = getAbsoluteOffset(
      rotateRelativeOffset(relativeOffset, direction),
      this.orientation,
    );
    const spaceLocation = translateLocation(this.location, offset);
    return this.floor.getSpaceAt(spaceLocation);
  }

  /**
   * Returns the distance between the given space and this position.
   *
   * @param {Space} space The space to calculate the distance of.
   *
   * @returns {number} The distance of the space.
   */
  getDistanceOf(space) {
    return getDistanceOfLocation(space.location, this.location);
  }

  /**
   * Returns the relative direction of the given space with reference to this
   * position.
   *
   * @param {Space} space The space to get the relative direction of.
   *
   * @returns {string} The relative direction.
   */
  getRelativeDirectionOf(space) {
    return getRelativeDirection(
      getDirectionOfLocation(space.location, this.location),
      this.orientation,
    );
  }

  /**
   * Moves this position by a given offset.
   *
   * @param {string} direction The direction.
   * @param {number[]} relativeOffset The relative offset.
   */
  move(direction, relativeOffset) {
    const offset = getAbsoluteOffset(
      rotateRelativeOffset(relativeOffset, direction),
      this.orientation,
    );
    this.location = translateLocation(this.location, offset);
  }

  /**
   * Rotates this position in a given direction.
   *
   * @param {string} direction The direction in which to rotate.
   */
  rotate(direction) {
    this.orientation = getAbsoluteDirection(direction, this.orientation);
  }
}

export default Position;
