import {
  BACKWARD,
  EAST,
  FORWARD,
  LEFT,
  NORTH,
  RIGHT,
  SOUTH,
  WEST,
} from '@warriorjs/geography';

import Floor from './Floor';
import Unit from './Unit';

describe('Position', () => {
  let floor;
  let unit;
  let position;

  beforeEach(() => {
    floor = new Floor(5, 6, [0, 0]);
    unit = new Unit();
    floor.addUnit(unit, { x: 1, y: 2, facing: NORTH });
    position = unit.position; // eslint-disable-line prefer-destructuring
  });

  test("can determine if it's at a given location", () => {
    expect(position.isAt([1, 1])).toBe(false);
    expect(position.isAt([1, 2])).toBe(true);
  });

  test('returns the space at its location', () => {
    expect(position.getSpace().location).toEqual(position.location);
  });

  test('gets relative space in front', () => {
    floor.addUnit(new Unit(), { x: 1, y: 1, facing: NORTH });
    expect(position.getRelativeSpace(FORWARD, [1, 0]).isEmpty()).toBe(false);
  });

  test('gets relative space in front two spaces yonder', () => {
    floor.addUnit(new Unit(), { x: 1, y: 0, facing: NORTH });
    expect(position.getRelativeSpace(FORWARD, [2, 0]).isEmpty()).toBe(false);
  });

  test('gets relative space in front when rotated', () => {
    floor.addUnit(new Unit(), { x: 2, y: 2, facing: NORTH });
    position.rotate(RIGHT);
    expect(position.getRelativeSpace(FORWARD, [1, 0]).isEmpty()).toBe(false);
  });

  test('gets relative space diagonally', () => {
    floor.addUnit(new Unit(), { x: 2, y: 1, facing: NORTH });
    expect(position.getRelativeSpace(FORWARD, [1, 1]).isEmpty()).toBe(false);
  });

  test('gets relative space diagonally when rotated', () => {
    floor.addUnit(new Unit(), { x: 2, y: 1, facing: NORTH });
    position.rotate(BACKWARD);
    expect(position.getRelativeSpace(FORWARD, [-1, -1]).isEmpty()).toBe(false);
  });

  test('returns distance of given space', () => {
    expect(position.getDistanceOf(floor.getSpaceAt([5, 3]))).toBe(5);
    expect(position.getDistanceOf(floor.getSpaceAt([4, 2]))).toBe(3);
  });

  test('returns relative direction of given space', () => {
    expect(position.getRelativeDirectionOf(floor.getSpaceAt([5, 3]))).toEqual(
      RIGHT,
    );
    position.rotate(RIGHT);
    expect(position.getRelativeDirectionOf(floor.getSpaceAt([1, 4]))).toEqual(
      RIGHT,
    );
  });

  test('rotates position on floor relatively', () => {
    expect(position.orientation).toEqual(NORTH);
    [EAST, SOUTH, WEST, NORTH, EAST].forEach(direction => {
      position.rotate(RIGHT);
      expect(position.orientation).toEqual(direction);
    });
  });

  test('moves position on floor relatively', () => {
    expect(floor.getUnitAt([1, 2])).toBe(unit);
    position.move(BACKWARD, [1, 1]);
    expect(floor.getUnitAt([1, 2])).toBeUndefined();
    expect(floor.getUnitAt([0, 3])).toBe(unit);
    position.rotate(LEFT);
    position.move(RIGHT, [1, 0]);
    expect(floor.getUnitAt([0, 3])).toBeUndefined();
    expect(floor.getUnitAt([0, 2])).toBe(unit);
  });
});
