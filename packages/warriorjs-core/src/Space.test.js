import { NORTH } from '@warriorjs/geography';

import Floor from './Floor';
import Unit from './Unit';
import Warrior from './Warrior';

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

    test('is not hostile', () => {
      expect(space.isHostile()).toBe(false);
    });

    test('is not warrior', () => {
      expect(space.isWarrior()).toBe(false);
    });

    test('is not wall', () => {
      expect(space.isWall()).toBe(false);
    });

    test('is not stairs', () => {
      expect(space.isStairs()).toBe(false);
    });

    test('is not bound', () => {
      expect(space.isBound()).toBe(false);
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

    test('is not wall', () => {
      expect(space.isWall()).toBe(false);
    });

    test('is empty', () => {
      expect(space.isEmpty()).toBe(true);
    });

    test('is stairs', () => {
      expect(space.isStairs()).toBe(true);
    });

    test("appears as '>' on map", () => {
      expect(space.getCharacter()).toBe('>');
    });
  });

  describe('with unit', () => {
    let unit;

    beforeEach(() => {
      unit = new Unit();
      unit.name = 'Joe';
      unit.character = '@';
      floor.addUnit(unit, { x: 0, y: 0, facing: NORTH });
      space = floor.getSpaceAt([0, 0]);
    });

    test('has name of unit', () => {
      expect(space.toString()).toEqual('Joe');
    });

    test("appears as '@' on map", () => {
      expect(space.getCharacter()).toBe('@');
    });

    test('is not bound', () => {
      expect(space.isBound()).toBe(false);
    });

    describe('hostile', () => {
      test('is hostile', () => {
        expect(space.isHostile()).toBe(true);
      });

      test('is not friendly', () => {
        expect(space.isFriendly()).toBe(false);
      });

      test('is not warrior', () => {
        expect(space.isWarrior()).toBe(false);
      });

      test('is not empty', () => {
        expect(space.isEmpty()).toBe(false);
      });

      describe('bound', () => {
        beforeEach(() => {
          unit.bind();
        });

        test("doesn't look like a hostile", () => {
          expect(space.isHostile()).toBe(false);
        });
      });
    });

    describe('captive', () => {
      beforeEach(() => {
        unit.hostile = false;
      });

      test('is not hostile', () => {
        expect(space.isHostile()).toBe(false);
      });

      test('is friendly', () => {
        expect(space.isFriendly()).toBe(true);
      });
    });

    describe('bound', () => {
      beforeEach(() => {
        unit.bind();
      });

      test('is bound', () => {
        expect(space.isBound()).toBe(true);
      });
    });

    describe('with effects', () => {
      test('is under ticking effect if unit is ticking', () => {
        unit.addEffect('ticking');
        expect(space.isUnderEffect('ticking')).toBe(true);
      });

      test('is not under effect if unit is not under such effect', () => {
        expect(space.isUnderEffect('ticking')).toBe(false);
      });
    });
  });

  describe('with warrior', () => {
    beforeEach(() => {
      const warrior = new Warrior();
      floor.addUnit(warrior, { x: 0, y: 0, facing: NORTH });
      floor.warrior = warrior;
      space = floor.getSpaceAt([0, 0]);
    });

    test('is warrior', () => {
      expect(space.isWarrior()).toBe(true);
    });

    test('is player', () => {
      expect(space.isPlayer()).toBe(true);
    });

    test('is not hostile', () => {
      expect(space.isHostile()).toBe(false);
    });

    test('is not empty', () => {
      expect(space.isEmpty()).toBe(false);
    });
  });
});
