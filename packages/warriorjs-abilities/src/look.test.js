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
      `Returns an array of up to 3 spaces in the given direction (${FORWARD} by default).`,
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

    test('returns adjacent space in specified direction', () => {
      unit.getSensedSpaceAt
        .mockReturnValueOnce('space1')
        .mockReturnValueOnce('space2')
        .mockReturnValueOnce('space3')
        .mockReturnValueOnce('space4');
      expect(look.perform()).toEqual(['space1', 'space2', 'space3']);
    });
  });
});
