const Logger = {
  /**
   * Prepares logger for a play.
   *
   * @param {Floor} floor The floor of the level.
   */
  play(floor) {
    Logger.floor = floor;
    Logger.events = [];
    Logger.lastTurn = null;
  },
  /**
   * Prepares logger for a turn.
   */
  turn() {
    Logger.lastTurn = [];
    Logger.events.push(Logger.lastTurn);
  },
  /**
   * Logs a message with the accompanying unit.
   *
   * @param {Unit} unit The owner of the message.
   * @param {string} message The message.
   */
  unit(unit, message) {
    Logger.lastTurn.push({
      message,
      unit: JSON.parse(JSON.stringify(unit)),
      floorMap: JSON.parse(JSON.stringify(Logger.floor.getMap())),
      warriorStatus: Logger.floor.warrior.getStatus(),
    });
  },
};

export default Logger;
