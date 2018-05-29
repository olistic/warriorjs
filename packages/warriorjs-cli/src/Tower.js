class Tower {
  /**
   * Creates a tower.
   *
   * @param {string} name The name of the tower.
   * @param {Object[]} levels The levels of the tower.
   */
  constructor(name, levels) {
    this.name = name;
    this.levels = levels;
  }

  /**
   * Checks if the tower has a level with the given number.
   *
   * @param {number} levelNumber The number of the level.
   *
   * @returns {boolean} Whether the tower has the level or not.
   */
  hasLevel(levelNumber) {
    return !!this.getLevel(levelNumber);
  }

  /**
   * Returns the level with the given number.
   *
   * @param {number} levelNumber The number of the level.
   *
   * @returns {Object} The level.
   */
  getLevel(levelNumber) {
    return this.levels[levelNumber - 1];
  }

  /**
   * Returns the string representation of this tower.
   *
   * @returns {string} The string representation.
   */
  toString() {
    return this.name;
  }
}

export default Tower;
