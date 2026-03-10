import {
  getAbsoluteDirection,
  getAbsoluteOffset,
  getDirectionOfLocation,
  getDistanceOfLocation,
  getRelativeDirection,
  rotateRelativeOffset,
  translateLocation,
  verifyAbsoluteDirection,
} from '@warriorjs/geography';

import type Floor from './Floor.js';
import type Space from './Space.js';

/** Class representing a position. */
class Position {
  floor: Floor;
  location: [number, number];
  orientation: string;

  constructor(floor: Floor, location: [number, number], orientation: string) {
    verifyAbsoluteDirection(orientation);
    this.floor = floor;
    this.location = location;
    this.orientation = orientation;
  }

  isAt([x, y]: [number, number]): boolean {
    const [locationX, locationY] = this.location;
    return locationX === x && locationY === y;
  }

  getSpace(): Space {
    return this.floor.getSpaceAt(this.location);
  }

  getRelativeSpace(direction: string, relativeOffset: [number, number]): Space {
    const offset = getAbsoluteOffset(
      rotateRelativeOffset(relativeOffset, direction),
      this.orientation,
    );
    const spaceLocation = translateLocation(this.location, offset) as [number, number];
    return this.floor.getSpaceAt(spaceLocation);
  }

  getDistanceOf(space: Space): number {
    return getDistanceOfLocation(space.location, this.location);
  }

  getRelativeDirectionOf(space: Space): string {
    return getRelativeDirection(
      getDirectionOfLocation(space.location, this.location),
      this.orientation,
    );
  }

  move(direction: string, relativeOffset: [number, number]): void {
    const offset = getAbsoluteOffset(
      rotateRelativeOffset(relativeOffset, direction),
      this.orientation,
    );
    this.location = translateLocation(this.location, offset) as [number, number];
  }

  rotate(direction: string): void {
    this.orientation = getAbsoluteDirection(direction, this.orientation);
  }
}

export default Position;
