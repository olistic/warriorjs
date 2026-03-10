import Logger from './Logger.js';
import type Floor from './Floor.js';

const maxTurns = 200;

/** Class representing a level. */
class Level {
  number: number;
  description: string;
  tip: string;
  clue: string;
  floor: Floor;

  constructor(number: number, description: string, tip: string, clue: string, floor: Floor) {
    this.number = number;
    this.description = description;
    this.tip = tip;
    this.clue = clue;
    this.floor = floor;
  }

  play(turns: number = maxTurns): { passed: boolean; events: any[][] } {
    Logger.play(this.floor);

    for (let n = 0; n < turns; n += 1) {
      if (this.wasPassed() || this.wasFailed()) {
        break;
      }

      Logger.turn();

      this.floor.getUnits().forEach(unit => unit.prepareTurn());
      this.floor.getUnits().forEach(unit => unit.performTurn());
    }

    const passed = this.wasPassed();

    return {
      passed,
      events: Logger.events,
    };
  }

  wasPassed(): boolean {
    const stairsSpace = this.floor.getStairsSpace();
    return stairsSpace.getUnit() === this.floor.warrior;
  }

  wasFailed(): boolean {
    return !this.floor.warrior!.isAlive();
  }

  toJSON(): any {
    return {
      number: this.number,
      description: this.description,
      tip: this.tip,
      clue: this.clue,
      floorMap: this.floor.getMap(),
      warriorStatus: this.floor.warrior!.getStatus(),
      warriorAbilities: this.floor.warrior!.getAbilities(),
    };
  }
}

export default Level;
