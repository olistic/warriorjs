import { FORWARD, LEFT } from '@warriorjs/geography';

import lookCreator from './look';

describe('look', () => {
  let look;
  let unit;

  beforeEach(() => {
    unit = { getSpaceAt: jest.fn() };
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
    beforeEach(() => {
      unit.getSpaceAt
        .mockReturnValueOnce({ toPlayerObject: () => 'space1' })
        .mockReturnValueOnce({ toPlayerObject: () => 'space2' })
        .mockReturnValueOnce({ toPlayerObject: () => 'space3' })
        .mockReturnValueOnce({ toPlayerObject: () => 'space4' });
    });

    test('looks forward by default', () => {
      look.perform();
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD, 1);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD, 2);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD, 3);
    });

    test('allows to specify direction', () => {
      look.perform(LEFT);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT, 1);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT, 2);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT, 3);
    });

    test('returns adjacent space in specified direction', () => {
      unit.getSpaceAt
        .mockReturnValueOnce('space1')
        .mockReturnValueOnce('space2')
        .mockReturnValueOnce('space3')
        .mockReturnValueOnce('space4');
      expect(look.perform()).toEqual(['space1', 'space2', 'space3']);
    });
  });
});
