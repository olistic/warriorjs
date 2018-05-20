import { FORWARD, LEFT } from '@warriorjs/geography';

import feelCreator from './feel';

describe('feel', () => {
  let feel;
  let unit;

  beforeEach(() => {
    unit = { getSensedSpaceAt: jest.fn() };
    feel = feelCreator()(unit);
  });

  test('is not an action', () => {
    expect(feel.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(feel.description).toBe(
      `Return the adjacent space in the given direction (${FORWARD} by default).`,
    );
  });

  describe('performing', () => {
    test('feels forward by default', () => {
      feel.perform();
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      feel.perform(LEFT);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(LEFT);
    });

    test('returns adjacent space in specified direction', () => {
      unit.getSensedSpaceAt.mockReturnValue('space');
      expect(feel.perform()).toBe('space');
    });
  });
});
