import { Sense } from '@warriorjs/core';
import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import DirectionOf from './DirectionOf.js';

describe('DirectionOf', () => {
  let directionOf: DirectionOf;
  let unit: any;

  beforeEach(() => {
    unit = { getDirectionOf: vi.fn() };
    directionOf = new DirectionOf(unit);
  });

  test('is a sense', () => {
    expect(directionOf).toBeInstanceOf(Sense);
  });

  test('has a description', () => {
    expect(directionOf.description).toBe(
      `Returns the direction (${FORWARD}, ${RIGHT}, ${BACKWARD} or ${LEFT}) to the given space.`,
    );
  });

  test('has meta for type generation', () => {
    expect(directionOf.meta).toEqual({
      params: [{ name: 'space', type: 'Space' }],
      returns: 'Direction',
    });
  });

  describe('performing', () => {
    test('returns direction of specified space', () => {
      unit.getDirectionOf.mockReturnValue(RIGHT);
      expect(directionOf.perform()).toBe(RIGHT);
    });
  });
});
