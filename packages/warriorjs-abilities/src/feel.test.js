import { FORWARD, LEFT } from '@warriorjs/geography';

import feelCreator from './feel';

describe('feel', () => {
  let feel;
  let unit;

  beforeEach(() => {
    unit = { getSpaceAt: jest.fn() };
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
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      feel.perform(LEFT);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT);
    });

    test('returns adjacent space in specified direction', () => {
      unit.getSpaceAt.mockReturnValue('space');
      expect(feel.perform()).toBe('space');
    });
  });
});
