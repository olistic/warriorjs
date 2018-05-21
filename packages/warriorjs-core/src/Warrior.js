import Unit from './Unit';

/** Class representing a warrior. */
class Warrior extends Unit {
  /**
   * Creates a warrior.
   *
   * @param {string} name The name of the warrior.
   * @param {string} character The character of the warrior.
   * @param {number} maxHealth The max health in HP.
   */
  constructor(name, character, maxHealth) {
    super(name, character, maxHealth, null, false);
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

  toJSON() {
    return {
      ...super.toJSON(),
      warrior: true,
      score: this.score,
      abilities: {
        actions: [...this.abilities]
          .filter(([, ability]) => ability.action)
          .map(([name, action]) => [name, action.description]),
        senses: [...this.abilities]
          .filter(([, ability]) => !ability.action)
          .map(([name, sense]) => [name, sense.description]),
      },
    };
  }
}

export default Warrior;
