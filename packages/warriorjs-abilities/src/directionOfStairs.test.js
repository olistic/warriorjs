import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/geography';

import directionOfStairsCreator from './directionOfStairs';

describe('directionOfStairs', () => {
  let directionOfStairs;
  let unit;

  beforeEach(() => {
    unit = { getDirectionOfStairs: jest.fn() };
    directionOfStairs = directionOfStairsCreator()(unit);
  });

  test('is not an action', () => {
    expect(directionOfStairs.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(directionOfStairs.description).toBe(
      `Return the direction (${FORWARD}, ${RIGHT}, ${BACKWARD} or ${LEFT}) the stairs are from your location.`,
    );
  });

  describe('performing', () => {
    test('returns direction of stairs', () => {
      unit.getDirectionOfStairs.mockReturnValue(RIGHT);
      expect(directionOfStairs.perform()).toBe(RIGHT);
    });
  });
});
