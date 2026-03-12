import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import directionOfStairsCreator from './directionOfStairs.js';

describe('directionOfStairs', () => {
  let directionOfStairs: ReturnType<ReturnType<typeof directionOfStairsCreator>>;
  let unit: any;

  beforeEach(() => {
    unit = { getDirectionOfStairs: vi.fn() };
    directionOfStairs = directionOfStairsCreator()(unit);
  });

  test('is not an action', () => {
    expect(directionOfStairs.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(directionOfStairs.description).toBe(
      `Returns the direction (${FORWARD}, ${RIGHT}, ${BACKWARD} or ${LEFT}) the stairs are from your location.`,
    );
  });

  test('has meta for type generation', () => {
    expect(directionOfStairs.meta).toEqual({
      params: [],
      returns: 'Direction',
    });
  });

  describe('performing', () => {
    test('returns direction of stairs', () => {
      unit.getDirectionOfStairs.mockReturnValue(RIGHT);
      expect(directionOfStairs.perform()).toBe(RIGHT);
    });
  });
});
