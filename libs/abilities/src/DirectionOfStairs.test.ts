import { Sense } from '@warriorjs/core';
import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import DirectionOfStairs from './DirectionOfStairs.js';

describe('DirectionOfStairs', () => {
  let directionOfStairs: DirectionOfStairs;
  let unit: any;

  beforeEach(() => {
    unit = { getDirectionOfStairs: vi.fn() };
    directionOfStairs = new DirectionOfStairs(unit);
  });

  test('is a sense', () => {
    expect(directionOfStairs).toBeInstanceOf(Sense);
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
