const Logger = {
  initialize(floor) {
    Logger.events = [];
    Logger.floor = floor;
  },
  turn() {
    Logger.events.push({
      floor: JSON.parse(JSON.stringify(Logger.floor)),
      type: 'TURN',
    });
  },
  unit(unit, message) {
    Logger.events.push({
      message,
      unit: JSON.parse(JSON.stringify(unit)),
      floor: JSON.parse(JSON.stringify(Logger.floor)),
      type: 'UNIT',
    });
  },
};

export default Logger;
