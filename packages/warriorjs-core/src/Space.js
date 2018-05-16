const upperLeftWallCharacter = '╔';
const upperRightWallCharacter = '╗';
const lowerLeftWallCharacter = '╚';
const lowerRightWallCharacter = '╝';
const verticalWallCharacter = '║';
const horizontalWallCharacter = '═';
const emptyCharacter = ' ';
const stairsCharacter = '>';

/** Class representing a space in the floor. */
class Space {
  /**
   * Creates a space.
   *
   * @param {Floor} floor The floor.
   * @param {number[]} location The location as a pair of coordinates [x, y].
   */
  constructor(floor, location) {
    this.floor = floor;
    this.location = location;
  }

  /**
   * Returns the character that represents this space.
   *
   * @returns {string} The character.
   */
  getCharacter() {
    if (this.isUnit()) {
      return this.getUnit().character;
    }

    if (this.isWall()) {
      const [locationX, locationY] = this.location;
      if (locationX < 0) {
        if (locationY < 0) {
          return upperLeftWallCharacter;
        } else if (locationY > this.floor.height - 1) {
          return lowerLeftWallCharacter;
        }

        return verticalWallCharacter;
      } else if (locationX > this.floor.width - 1) {
        if (locationY < 0) {
          return upperRightWallCharacter;
        } else if (locationY > this.floor.height - 1) {
          return lowerRightWallCharacter;
        }

        return verticalWallCharacter;
      }

      return horizontalWallCharacter;
    }

    if (this.isStairs()) {
      return stairsCharacter;
    }

    return emptyCharacter;
  }

  /**
   * Checks if the space is empty (stairs count as empty space).
   *
   * @returns {boolean} Whether the space is empty or not.
   */
  isEmpty() {
    return !this.isUnit() && !this.isWall();
  }

  /**
   * Checks if the stairs are located at this space.
   *
   * @returns {boolean} Whether the stairs are located at this space or not.
   */
  isStairs() {
    const [stairsX, stairsY] = this.floor.stairsLocation;
    const [locationX, locationY] = this.location;
    return stairsX === locationX && stairsY === locationY;
  }

  /**
   * Checks if there is a wall located at this space.
   *
   * @returns {boolean} Whether there is a wall located at this space or not.
   */
  isWall() {
    return this.floor.isOutOfBounds(this.location);
  }

  /**
   * Checks if there is a unit located at this space.
   *
   * @returns {boolean} Whether there is a unit located at this space or not.
   */
  isUnit() {
    return !!this.getUnit();
  }

  /**
   * Returns the unit located at this space (if any).
   *
   * @returns {Unit} The unit.
   */
  getUnit() {
    return this.floor.getUnitAt(this.location);
  }

  /**
   * Returns the string representation of this space.
   *
   * @returns {string} The string representation.
   */
  toString() {
    if (this.isUnit()) {
      return this.getUnit().toString();
    }

    if (this.isWall()) {
      return 'wall';
    }

    return 'nothing';
  }

  /**
   * Customizes the JSON stringification behavior of the space.
   *
   * @returns {Object} The value to be serialized.
   */
  toJSON() {
    return {
      character: this.getCharacter(),
      stairs: this.isStairs(),
      unit: this.getUnit(),
    };
  }
}

export default Space;
