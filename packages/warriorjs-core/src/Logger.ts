import type Floor from './Floor.js';
import type Unit from './Unit.js';

interface LogEvent {
  message: string;
  unit: any;
  floorMap: any;
  warriorStatus: { health: number; score: number };
}

const Logger: {
  floor: Floor | null;
  events: LogEvent[][];
  lastTurn: LogEvent[] | null;
  play(floor: Floor): void;
  turn(): void;
  unit(unit: Unit, message: string): void;
} = {
  floor: null,
  events: [],
  lastTurn: null,

  play(floor: Floor) {
    Logger.floor = floor;
    Logger.events = [];
    Logger.lastTurn = null;
  },

  turn() {
    Logger.lastTurn = [];
    Logger.events.push(Logger.lastTurn);
  },

  unit(unit: Unit, message: string) {
    Logger.lastTurn?.push({
      message,
      unit: JSON.parse(JSON.stringify(unit)),
      floorMap: JSON.parse(JSON.stringify(Logger.floor?.getMap())),
      warriorStatus: Logger.floor?.warrior?.getStatus(),
    });
  },
};

export default Logger;
