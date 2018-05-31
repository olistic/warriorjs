class Tower {
  /**
   * Creates a tower.
   *
   * @param {string} id The identifier of the tower.
   * @param {string} name The name of the tower.
   * @param {string} description The description of the tower.
   * @param {Object[]} levels The levels of the tower.
   */
  constructor(id, name, description, levels) {
    this.id = id;
    this.name = name;
    this.description = description;
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
