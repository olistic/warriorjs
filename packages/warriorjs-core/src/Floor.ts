import Position from './Position.js';
import Space from './Space.js';
import type Unit from './Unit.js';
import type Warrior from './Warrior.js';

interface AddUnitPosition {
  x: number;
  y: number;
  facing: string;
}

/** Class representing the floor of a level. */
class Floor {
  width: number;
  height: number;
  stairsLocation: [number, number];
  units: Unit[];
  warrior: Warrior | null;

  constructor(width: number, height: number, stairsLocation: [number, number]) {
    this.width = width;
    this.height = height;
    this.stairsLocation = stairsLocation;
    this.units = [];
    this.warrior = null;
  }

  getMap(): Space[][] {
    const map: Space[][] = [];
    for (let y = -1; y < this.height + 1; y += 1) {
      const row: Space[] = [];
      for (let x = -1; x < this.width + 1; x += 1) {
        row.push(this.getSpaceAt([x, y]));
      }
      map.push(row);
    }
    return map;
  }

  isOutOfBounds([x, y]: [number, number]): boolean {
    return x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1;
  }

  isStairs([x, y]: [number, number]): boolean {
    const [stairsX, stairsY] = this.stairsLocation;
    return x === stairsX && y === stairsY;
  }

  getStairsSpace(): Space {
    return this.getSpaceAt(this.stairsLocation);
  }

  getSpaceAt(location: [number, number]): Space {
    return new Space(this, location);
  }

  addWarrior(warrior: Warrior, position: AddUnitPosition): void {
    this.addUnit(warrior, position);
    this.warrior = warrior;
  }

  addUnit(unit: Unit, { x, y, facing }: AddUnitPosition): void {
    const unitWithPosition = unit;
    const location: [number, number] = [x, y];
    unitWithPosition.position = new Position(this, location, facing);
    this.units.push(unitWithPosition);
  }

  getUnitAt(location: [number, number]): Unit | undefined {
    return this.getUnits().find((unit) => unit.position?.isAt(location));
  }

  getUnits(): Unit[] {
    return this.units.filter((unit) => unit.isAlive());
  }
}

export default Floor;
