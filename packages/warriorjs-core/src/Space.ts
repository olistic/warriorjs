import { getAbsoluteOffset, getRelativeOffset, translateLocation } from '@warriorjs/geography';

import type Floor from './Floor.js';
import type Unit from './Unit.js';

const upperLeftWallCharacter = '\u2554';
const upperRightWallCharacter = '\u2557';
const lowerLeftWallCharacter = '\u255a';
const lowerRightWallCharacter = '\u255d';
const verticalWallCharacter = '\u2551';
const horizontalWallCharacter = '\u2550';
const emptyCharacter = ' ';
const stairsCharacter = '>';

export interface SensedSpace {
  getLocation(): [number, number];
  getUnit(): SensedUnit | null;
  isEmpty(): boolean;
  isStairs(): boolean;
  isUnit(): boolean;
  isWall(): boolean;
}

export interface SensedUnit {
  isBound(): boolean;
  isEnemy(): boolean;
  isUnderEffect(name: string): boolean;
}

/** Class representing a space in the floor. */
class Space {
  floor: Floor;
  location: [number, number];

  static from(sensedSpace: SensedSpace, unit: Unit): Space {
    const { floor, location, orientation } = unit.position!;
    const offset = getAbsoluteOffset(sensedSpace.getLocation(), orientation);
    const spaceLocation = translateLocation(location, offset) as [number, number];
    return new Space(floor, spaceLocation);
  }

  constructor(floor: Floor, location: [number, number]) {
    this.floor = floor;
    this.location = location;
  }

  getCharacter(): string {
    if (this.isUnit()) {
      return this.getUnit()!.character;
    }

    if (this.isWall()) {
      const [locationX, locationY] = this.location;
      if (locationX < 0) {
        if (locationY < 0) {
          return upperLeftWallCharacter;
        }

        if (locationY > this.floor.height - 1) {
          return lowerLeftWallCharacter;
        }

        return verticalWallCharacter;
      }

      if (locationX > this.floor.width - 1) {
        if (locationY < 0) {
          return upperRightWallCharacter;
        }

        if (locationY > this.floor.height - 1) {
          return lowerRightWallCharacter;
        }

        return verticalWallCharacter;
      }

      return horizontalWallCharacter;
    }

    if (this.isStairs()) {
      return stairsCharacter;
    }

    return emptyCharacter;
  }

  isEmpty(): boolean {
    return !this.isUnit() && !this.isWall();
  }

  isStairs(): boolean {
    return this.floor.isStairs(this.location);
  }

  isWall(): boolean {
    return this.floor.isOutOfBounds(this.location);
  }

  isUnit(): boolean {
    return !!this.getUnit();
  }

  getUnit(): Unit | undefined {
    return this.floor.getUnitAt(this.location);
  }

  as(unit: Unit): SensedSpace {
    return {
      getLocation: () =>
        getRelativeOffset(this.location, unit.position!.location, unit.position!.orientation) as [
          number,
          number,
        ],
      getUnit: () => {
        const spaceUnit = this.getUnit.call(this);
        return spaceUnit ? spaceUnit.as(unit) : null;
      },
      isEmpty: this.isEmpty.bind(this),
      isStairs: this.isStairs.bind(this),
      isUnit: this.isUnit.bind(this),
      isWall: this.isWall.bind(this),
    };
  }

  toString(): string {
    if (this.isUnit()) {
      return this.getUnit()!.toString();
    }

    if (this.isWall()) {
      return 'wall';
    }

    return 'nothing';
  }

  toJSON(): { character: string; unit: Unit | undefined } {
    return {
      character: this.getCharacter(),
      unit: this.getUnit(),
    };
  }
}

export default Space;
