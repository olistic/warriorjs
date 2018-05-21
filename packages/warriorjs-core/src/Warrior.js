import Unit from './Unit';

/** Class representing a warrior. */
class Warrior extends Unit {
  /**
   * Creates a warrior.
   *
   * @param {string} name The name of the warrior.
   * @param {string} character The character of the warrior.
   * @param {string} color The color of the warrior.
   * @param {number} maxHealth The max health in HP.
   */
  constructor(name, character, color, maxHealth) {
    super(name, character, color, maxHealth, null, false);
  }

  performTurn() {
    super.performTurn();
    if (!this.turn.action || this.isBound()) {
      this.log('does nothing');
    }
  }

  earnPoints(points) {
    super.earnPoints(points);
    this.log(`earns ${points} points`);
  }

  losePoints(points) {
    super.losePoints(points);
    this.log(`loses ${points} points`);
  }

  /**
   * Returns a grouped collection of abilities.
   *
   * @returns {Object} The collection of abilities.
   */
  getAbilities() {
    const abilities = [...this.abilities].map(
      ([name, { action, description }]) => ({
        name,
        action,
        description,
      }),
    );
    const sortedAbilities = abilities.sort((a, b) => a.name > b.name);
    const actions = sortedAbilities
      .filter(ability => ability.action)
      .map(({ action, ...rest }) => rest);
    const senses = sortedAbilities
      .filter(ability => !ability.action)
      .map(({ action, ...rest }) => rest);
    return {
      actions,
      senses,
    };
  }

  /**
   * Returns the status of the warrior.
   *
   * The status includes the current health and score values.
   *
   * @returns {Object} The status of the warrior.
   */
  getStatus() {
    return {
      health: this.health,
      score: this.score,
    };
  }
}

export default Warrior;
