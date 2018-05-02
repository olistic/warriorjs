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
   * Checks if there is a wall located at this space.
   *
   * @returns {boolean} Whether there is a wall located at this space or not.
   */
  isWall() {
    return this.floor.isOutOfBounds(this.location);
  }

  /**
   * Checks if the space is empty (stairs count as empty space).
   *
   * @returns {boolean} Whether the space is empty or not.
   */
  isEmpty() {
    return !this.getUnit() && !this.isWall();
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
   * Checks if there is an enemy unit located at this space.
   *
   * A bound unit does not count as an enemy.
   *
   * @returns {boolean} Whether there is an enemy unit located at this space
   * or not.
   */
  isEnemy() {
    return (
      !!this.getUnit() &&
      !this.isPlayer() &&
      !this.isCaptive() &&
      !this.isBound()
    );
  }

  /**
   * Checks if there is a player unit located at this space.
   *
   * @returns {boolean} Whether there is a player unit located at this space
   * or not.
   */
  isPlayer() {
    return this.isWarrior();
  }

  /**
   * Checks if the warrior is located at this space.
   *
   * @returns {boolean} Whether the warrior is located at this space or not.
   */
  isWarrior() {
    const { warrior } = this.floor;
    return !!warrior && warrior === this.getUnit();
  }

  /**
   * Checks if there is a captive unit located at this space.
   *
   * @returns {boolean} Whether there is a captive unit located at this space or
   * not.
   */
  isCaptive() {
    const unit = this.getUnit();
    return !!unit && unit.isCaptive();
  }

  /**
   * Checks if the unit located at this space (if any) is bound.
   *
   * @returns {boolean} Whether the unit located at this space (if any) is bound
   * or not.
   */
  isBound() {
    const unit = this.getUnit();
    return !!unit && unit.isBound();
  }

  /**
   * Checks if the unit located at this space (if any) is under the given
   * effect.
   *
   * @param {string} name The name of the effect.
   *
   * @returns {boolean} Whether the unit is under the effect or not.
   */
  isUnderEffect(name) {
    const unit = this.getUnit();
    return !!unit && unit.isUnderEffect(name);
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
   * Returns the character that represents this space.
   *
   * @returns {string} The character.
   */
  getCharacter() {
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

    if (!this.isEmpty()) {
      return this.getUnit().character;
    }

    if (this.isStairs()) {
      return stairsCharacter;
    }

    return emptyCharacter;
  }

  /**
   * Returns the string representation of this space.
   *
   * @returns {string} The string representation.
   */
  toString() {
    const unit = this.getUnit();
    if (unit) {
      return unit.toString();
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
