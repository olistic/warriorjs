import PlayerError from './PlayerError';
import Unit from './Unit';

/** Class that represents a warrior. */
class Warrior extends Unit {
  /**
   * Creates a warrior.
   *
   * @param {string} name The name of the warrior.
   * @param {string} character The character of the warrior.
   * @param {number} maxHealth The max health in HP.
   */
  constructor(name, character, maxHealth) {
    super(name, character, maxHealth, null);
  }

  /**
   * Delegates the turn to the player instance.
   *
   * @param {Turn} turn The turn.
   */
  playTurn(turn) {
    try {
      this.player.playTurn(turn);
    } catch (err) {
      throw new PlayerError(`Invalid submitted code: ${err.message}`);
    }
  }

  performTurn() {
    super.performTurn();
    if (!this.turn.action || this.isBound()) {
      this.say('does nothing');
    }
  }

  earnPoints(points) {
    super.earnPoints(points);
    this.say(`earns ${points} points`);
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
