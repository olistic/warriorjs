import Logger from './Logger';

const maxTurns = 200;

/** Class representing a level. */
class Level {
  /**
   * Creates a level.
   *
   * @param {string} towerName The name of the tower.
   * @param {number} number The number of the level.
   * @param {string} description The description of the level.
   * @param {string} tip A tip for the level.
   * @param {string} clue A clue for the level.
   * @param {number} timeBonus The bonus for completing the level fast.
   * @param {Floor} floor The floor of the level.
   */
  constructor(towerName, number, description, tip, clue, timeBonus, floor) {
    this.towerName = towerName;
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
    Logger.initialize(this.floor);

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
    const { warrior } = this.floor;
    const { score: warriorScore } = warrior;
    const { timeBonus } = this;
    const levelCleared = warrior.getOtherUnits().length === 0;
    const clearBonus = levelCleared
      ? Math.round((warriorScore + timeBonus) * 0.2)
      : 0;
    return {
      clearBonus,
      timeBonus,
      warriorScore,
    };
  }
}

export default Level;
