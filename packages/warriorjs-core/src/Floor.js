import Position from './Position';
import Space from './Space';

/** Class representing the floor of a level. */
class Floor {
  /**
   * Creates a floor.
   *
   * @param {number} width The width of the floor.
   * @param {number} height The height of the floor.
   * @param {number[]} stairsLocation The location of the stairs as [x, y].
   */
  constructor(width, height, stairsLocation) {
    this.width = width;
    this.height = height;
    this.stairsLocation = stairsLocation;
    this.units = [];
    this.warrior = null;
  }

  /**
   * Returns the map of the floor.
   *
   * The map is a 2D array containing each space in the floor.
   *
   * @returns {Object[][]} The map of the floor.
   */
  getMap() {
    const map = [];
    for (let y = -1; y < this.height + 1; y += 1) {
      const row = [];
      for (let x = -1; x < this.width + 1; x += 1) {
        row.push(this.getSpaceAt([x, y]));
      }
      map.push(row);
    }
    return map;
  }

  /**
   * Checks if the given location is outside the floor boundaries.
   *
   * @param {number[]} location The location as [x, y].
   *
   * @returns {boolean} Whether the location is out of bounds or not.
   */
  isOutOfBounds([x, y]) {
    return x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1;
  }

  /**
   * Checks if the stairs are at the given location.
   *
   * @param {number[]} location The location as [x, y].
   *
   * @returns {boolean} Whether the stairs are at the given location or not.
   */
  isStairs([x, y]) {
    const [stairsX, stairsY] = this.stairsLocation;
    return x === stairsX && y === stairsY;
  }

  /**
   * Returns the space where the stairs are located.
   *
   * @returns {Space} The space the stairs are located at.
   */
  getStairsSpace() {
    return this.getSpaceAt(this.stairsLocation);
  }

  /**
   * Returns the space at a given location.
   *
   * @param {number[]} location The location as [x, y].
   *
   * @returns {Space} The space at the location.
   */
  getSpaceAt(location) {
    return new Space(this, location);
  }

  /**
   * Adds the warrior to the floor in the given position.
   *
   * @param {Warrior} warrior The warrior.
   * @param {Object} position The position in which to add the warrior.
   */
  addWarrior(warrior, position) {
    this.addUnit(warrior, position);
    this.warrior = warrior;
  }

  /**
   * Adds a unit to the floor in the given position.
   *
   * @param {Unit} unit The unit to add to the floor.
   * @param {Object} position The position in which to add the unit.
   * @param {number} position.x The x coordinate of the position.
   * @param {number} position.y The y coordinate of the position.
   * @param {string} position.facing The orientation of the position.
   */
  addUnit(unit, { x, y, facing }) {
    const unitWithPosition = unit;
    const location = [x, y];
    unitWithPosition.position = new Position(this, location, facing);
    this.units.push(unitWithPosition);
  }

  /**
   * Returns the unit at a given location or null if there is none.
   *
   * @param {number[]} location The location as [x, y].
   *
   * @returns {Unit} The unit at the location.
   */
  getUnitAt(location) {
    return this.getUnits().find(unit => unit.position.isAt(location));
  }

  /**
   * Returns the units in the floor that are still alive.
   */
  getUnits() {
    return this.units.filter(unit => unit.isAlive());
  }

  /**
   * Customizes the JSON stringification behavior of the floor.
   *
   * @returns {Object} The value to be serialized.
   */
  toJSON() {
    return {
      map: this.getMap(),
      warrior: this.warrior,
    };
  }
}

export default Floor;
