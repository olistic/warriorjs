import { FORWARD, LEFT } from '@warriorjs/geography';

import lookCreator from './look';

describe('look', () => {
  let look;
  let unit;

  beforeEach(() => {
    unit = { getSensedSpaceAt: jest.fn() };
    look = lookCreator({ range: 3 })(unit);
  });

  test('is not an action', () => {
    expect(look.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(look.description).toBe(
      `Returns an array of up to 3 spaces in the given direction (\`'${FORWARD}'\` by default).`,
    );
  });

  describe('performing', () => {
    test('looks forward by default', () => {
      look.perform();
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD, 1);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD, 2);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD, 3);
    });

    test('allows to specify direction', () => {
      look.perform(LEFT);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(LEFT, 1);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(LEFT, 2);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(LEFT, 3);
    });

    test('returns spaces in range in specified direction', () => {
      const space1 = { isWall: () => false };
      const space2 = { isWall: () => false };
      const space3 = { isWall: () => false };
      const space4 = { isWall: () => false };

      unit.getSensedSpaceAt
        .mockReturnValueOnce(space1)
        .mockReturnValueOnce(space2)
        .mockReturnValueOnce(space3)
        .mockReturnValueOnce(space4);
      expect(look.perform()).toEqual([space1, space2, space3]);
    });

    test("can't see through walls", () => {
      const space1 = { isWall: () => false };
      const space2 = { isWall: () => true };
      const space3 = { isWall: () => false };

      unit.getSensedSpaceAt
        .mockReturnValueOnce(space1)
        .mockReturnValueOnce(space2)
        .mockReturnValueOnce(space3);

      expect(look.perform()).toEqual([space1, space2]);
    });
  });
});
