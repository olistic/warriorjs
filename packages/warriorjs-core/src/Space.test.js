import { NORTH } from '@warriorjs/geography';

import Floor from './Floor';
import Unit from './Unit';

describe('Space', () => {
  let floor;
  let space;

  beforeEach(() => {
    floor = new Floor(2, 3, [0, 2]);
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

      test("appears as '╔' on map", () => {
        expect(space.getCharacter()).toBe('╔');
      });
    });

    describe('upper right corner', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([2, -1]);
      });

      test("appears as '╗' on map", () => {
        expect(space.getCharacter()).toBe('╗');
      });
    });

    describe('lower left corner', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([-1, 3]);
      });

      test("appears as '╚' on map", () => {
        expect(space.getCharacter()).toBe('╚');
      });
    });

    describe('lower right corner', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([2, 3]);
      });

      test("appears as '╝' on map", () => {
        expect(space.getCharacter()).toBe('╝');
      });
    });

    describe('upper side', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([1, -1]);
      });

      test("appears as '═' on map", () => {
        expect(space.getCharacter()).toBe('═');
      });
    });

    describe('lower side', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([1, 3]);
      });

      test("appears as '═' on map", () => {
        expect(space.getCharacter()).toBe('═');
      });
    });

    describe('left side', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([-1, 1]);
      });

      test("appears as '║' on map", () => {
        expect(space.getCharacter()).toBe('║');
      });
    });

    describe('right side', () => {
      beforeEach(() => {
        space = floor.getSpaceAt([2, 1]);
      });

      test("appears as '║' on map", () => {
        expect(space.getCharacter()).toBe('║');
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
      let unit;

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
    let unit;

    beforeEach(() => {
      unit = new Unit('Foo', 'f');
      floor.addUnit(unit, { x: 0, y: 0, facing: NORTH });
      space = floor.getSpaceAt([0, 0]);
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
});
