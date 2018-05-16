import { NORTH } from '@warriorjs/geography';

import Floor from './Floor';
import Space from './Space';
import Unit from './Unit';

describe('Floor', () => {
  let floor;

  beforeEach(() => {
    floor = new Floor(2, 3, [1, 2]);
  });

  test('returns its map', () => {
    const unit = new Unit();
    floor.addUnit(unit, { x: 0, y: 1, facing: NORTH });
    const map = floor.getMap();
    expect(map[1][1].isEmpty()).toBe(true);
    expect(map[3][2].isStairs()).toBe(true);
    expect(map[0][0].isWall()).toBe(true);
    expect(map[2][1].isUnit()).toBe(true);
  });

  test("doesn't consider corners out of bounds", () => {
    expect(floor.isOutOfBounds([0, 0])).toBe(false);
    expect(floor.isOutOfBounds([1, 0])).toBe(false);
    expect(floor.isOutOfBounds([1, 2])).toBe(false);
    expect(floor.isOutOfBounds([0, 2])).toBe(false);
  });

  test('considers out of bounds when going beyond sides', () => {
    expect(floor.isOutOfBounds([-1, 0])).toBe(true);
    expect(floor.isOutOfBounds([0, -1])).toBe(true);
    expect(floor.isOutOfBounds([0, 3])).toBe(true);
    expect(floor.isOutOfBounds([2, 0])).toBe(true);
  });

  test('returns the space at the stairs location', () => {
    const stairsSpace = floor.getStairsSpace();
    expect(stairsSpace.location).toEqual(floor.stairsLocation);
  });

  test('returns the space at the specified location', () => {
    const space = floor.getSpaceAt([0, 0]);
    expect(space).toBeInstanceOf(Space);
    expect(space.location).toEqual([0, 0]);
  });

  test('adds a unit and fetches it at that position', () => {
    const unit = new Unit();
    floor.addUnit(unit, { x: 0, y: 1, facing: NORTH });
    expect(floor.getUnitAt([0, 1])).toBe(unit);
  });

  test("doesn't consider a unit to be on the floor if it's not alive", () => {
    const unit = new Unit();
    floor.addUnit(unit, { x: 0, y: 1, facing: NORTH });
    unit.isAlive = () => false;
    expect(floor.getUnits()).not.toContain(unit);
  });
});
