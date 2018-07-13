import Logger from './Logger';

const maxTurns = 200;

/** Class representing a level. */
class Level {
  /**
   * Creates a level.
   *
   * @param {number} number The number of the level.
   * @param {string} description The description of the level.
   * @param {string} tip A tip for the level.
   * @param {string} clue A clue for the level.
   * @param {number} timeBonus The bonus for completing the level fast.
   * @param {Floor} floor The floor of the level.
   */
  constructor(number, description, tip, clue, timeBonus, floor) {
    this.number = number;
    this.description = description;
    this.tip = tip;
    this.clue = clue;
    this.timeBonus = timeBonus;
    this.floor = floor;
  }

  /**
   * Plays the level for a given number of turns or until it's passed or failed.
   *
   * If the max number of turns is reached, the level is considered failed.
   *
   * @param {number} turns The max number of turns to play the level for.
   *
   * @returns {Object} The play.
   */
  play(turns = maxTurns) {
    Logger.play(this.floor);

    for (let n = 0; n < turns; n += 1) {
      if (this.wasPassed() || this.wasFailed()) {
        break;
      }

      Logger.turn();

      this.floor.getUnits().forEach(unit => unit.prepareTurn());
      this.floor.getUnits().forEach(unit => unit.performTurn());

      if (this.timeBonus > 0) {
        this.timeBonus -= 1;
      }
    }

    const passed = this.wasPassed();
    const result = {
      passed,
      events: Logger.events,
    };
    if (passed) {
      result.score = this.getScore();
    }

    return result;
  }

  /**
   * Checks if the level was passed.
   *
   * The level is passed when the warrior reaches the stairs.
   *
   * @returns {boolean} Whether the level was passed or not.
   */
  wasPassed() {
    const stairsSpace = this.floor.getStairsSpace();
    return stairsSpace.getUnit() === this.floor.warrior;
  }

  /**
   * Checks if the level was failed.
   *
   * The level is failed when the warrior dies.
   *
   * @returns {boolean} Whether the level was failed or not.
   */
  wasFailed() {
    return !this.floor.warrior.isAlive();
  }

  /**
   * Returns the score of the play.
   *
   * @returns {Object} The score of the play.
   */
  getScore() {
    const {
      warrior: { score: warrior },
    } = this.floor;
    const { timeBonus } = this;
    const clearBonus = this.isCleared()
      ? Math.round((warrior + timeBonus) * 0.2)
      : 0;
    const total = warrior + timeBonus + clearBonus;
    return {
      warrior,
      timeBonus,
      clearBonus,
      total,
    };
  }

  /**
   * Checks if the level is cleared.
   *
   * The level is cleared when there are no units other than the warrior.
   *
   * @returns {boolean} Whether the level is cleared or not.
   */
  isCleared() {
    return this.floor.warrior.getOtherUnits().length === 0;
  }

  /**
   * Customizes the JSON stringification behavior of the level.
   *
   * @returns {Object} The value to be serialized.
   */
  toJSON() {
    return {
      number: this.number,
      description: this.description,
      tip: this.tip,
      clue: this.clue,
      floorMap: this.floor.getMap(),
      warriorAbilities: this.floor.warrior.getAbilities(),
    };
  }
}

export default Level;
