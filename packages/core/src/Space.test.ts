import { NORTH } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test } from 'vitest';

import Floor from './Floor.js';
import Space from './Space.js';
import Unit from './Unit.js';

describe('Space', () => {
  let floor: Floor;
  let space: Space;

  beforeEach(() => {
    floor = new Floor(2, 3, [0, 2]);
    space = floor.getSpaceAt([0, 0]);
  });

  describe('out of bounds', () => {
    beforeEach(() => {
      space = floor.getSpaceAt([-1, 1]);
    });

    test('is not empty', () => {
      expect(space.isEmpty()).toBe(false);
    });

    test('is not stairs', () => {
      expect(space.isStairs()).toBe(false);
    });

    test('is wall', () => {
      expect(space.isWall()).toBe(true);
    });

    test('has name "wall"', () => {
      expect(space.toString()).toEqual('wall');
    });

    describe('upper left corner', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([-1, -1]);
      });

      test("appears as '\u2554' on map", () => {
        expect(space.getCharacter()).toBe('\u2554');
      });
    });

    describe('upper right corner', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([2, -1]);
      });

      test("appears as '\u2557' on map", () => {
        expect(space.getCharacter()).toBe('\u2557');
      });
    });

    describe('lower left corner', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([-1, 3]);
      });

      test("appears as '\u255a' on map", () => {
        expect(space.getCharacter()).toBe('\u255a');
      });
    });

    describe('lower right corner', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([2, 3]);
      });

      test("appears as '\u255d' on map", () => {
        expect(space.getCharacter()).toBe('\u255d');
      });
    });

    describe('upper side', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([1, -1]);
      });

      test("appears as '\u2550' on map", () => {
        expect(space.getCharacter()).toBe('\u2550');
      });
    });

    describe('lower side', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([1, 3]);
      });

      test("appears as '\u2550' on map", () => {
        expect(space.getCharacter()).toBe('\u2550');
      });
    });

    describe('left side', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([-1, 1]);
      });

      test("appears as '\u2551' on map", () => {
        expect(space.getCharacter()).toBe('\u2551');
      });
    });

    describe('right side', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([2, 1]);
      });

      test("appears as '\u2551' on map", () => {
        expect(space.getCharacter()).toBe('\u2551');
      });
    });
  });

  describe('with nothing on it', () => {
    beforeEach(() => {
      space = floor.getSpaceAt([0, 0]);
    });

    test('is empty', () => {
      expect(space.isEmpty()).toBe(true);
    });

    test('is not stairs', () => {
      expect(space.isStairs()).toBe(false);
    });

    test('is not wall', () => {
      expect(space.isWall()).toBe(false);
    });

    test('is not unit', () => {
      expect(space.isUnit()).toBe(false);
    });

    test("doesn't fetch a unit", () => {
      expect(space.getUnit()).toBeUndefined();
    });

    test('has name "nothing"', () => {
      expect(space.toString()).toEqual('nothing');
    });

    test("appears as ' ' on map", () => {
      expect(space.getCharacter()).toBe(' ');
    });
  });

  describe('with stairs', () => {
    beforeEach(() => {
      space = floor.getSpaceAt([0, 2]);
    });

    test('is empty', () => {
      expect(space.isEmpty()).toBe(true);
    });

    test('is stairs', () => {
      expect(space.isStairs()).toBe(true);
    });

    test('is not wall', () => {
      expect(space.isWall()).toBe(false);
    });

    test('is not unit', () => {
      expect(space.isUnit()).toBe(false);
    });

    test("doesn't fetch a unit", () => {
      expect(space.getUnit()).toBeUndefined();
    });

    test('has name "nothing"', () => {
      expect(space.toString()).toEqual('nothing');
    });

    test("appears as '>' on map", () => {
      expect(space.getCharacter()).toBe('>');
    });

    describe('with unit', () => {
      let unit: Unit;

      beforeEach(() => {
        unit = new Unit('Foo', 'f');
        floor.addUnit(unit, { x: 0, y: 2, facing: NORTH });
      });

      test('is still stairs', () => {
        expect(space.isStairs()).toBe(true);
      });

      test('is also unit', () => {
        expect(space.isUnit()).toBe(true);
      });

      test('has name of unit', () => {
        expect(space.toString()).toEqual('Foo');
      });

      test('appears as unit character on map', () => {
        expect(space.getCharacter()).toBe('f');
      });
    });
  });

  describe('with unit', () => {
    let unit: Unit;

    beforeEach(() => {
      unit = new Unit('Foo', 'f');
      floor.addUnit(unit, { x: 0, y: 0, facing: NORTH });
    });

    test('is not empty', () => {
      expect(space.isEmpty()).toBe(false);
    });

    test('is not stairs', () => {
      expect(space.isStairs()).toBe(false);
    });

    test('is not wall', () => {
      expect(space.isWall()).toBe(false);
    });

    test('is unit', () => {
      expect(space.isUnit()).toBe(true);
    });

    test('fetches the unit', () => {
      expect(space.getUnit()).toBe(unit);
    });

    test('has name of unit', () => {
      expect(space.toString()).toEqual('Foo');
    });

    test('appears as its character on map', () => {
      expect(space.getCharacter()).toBe('f');
    });
  });

  describe('sensed space', () => {
    let sensingUnit: Unit;
    let sensedSpace: any;

    beforeEach(() => {
      sensingUnit = new Unit();
      floor.addUnit(sensingUnit, { x: 1, y: 1, facing: NORTH });
      sensedSpace = space.as(sensingUnit);
    });

    test('allows calling sensed space methods', () => {
      const allowedApi = ['getLocation', 'getUnit', 'isEmpty', 'isStairs', 'isUnit', 'isWall'];
      allowedApi.forEach((propertyName) => {
        sensedSpace[propertyName]();
      });
    });

    test("doesn't allow calling other space methods", () => {
      const forbiddenApi = ['as', 'getCharacter'];
      forbiddenApi.forEach((propertyName: string) => {
        expect(sensedSpace).not.toHaveProperty(propertyName);
      });
    });

    test('has a location relative to the sensing unit', () => {
      expect(sensedSpace.getLocation()).toEqual([1, -1]);
    });

    test('can get full space back', () => {
      const fullSpace = Space.from(sensedSpace, sensingUnit);
      expect(fullSpace).toBeInstanceOf(Space);
      expect(fullSpace.floor).toBe(space.floor);
      expect(fullSpace.location).toEqual(space.location);
    });
  });

  test('has a minimal JSON representation', () => {
    expect(space.toJSON()).toEqual({
      character: space.getCharacter(),
      unit: space.getUnit(),
    });
  });
});
