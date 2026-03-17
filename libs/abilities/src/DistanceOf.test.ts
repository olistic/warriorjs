import { Sense } from '@warriorjs/core';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import DistanceOf from './DistanceOf.js';

describe('DistanceOf', () => {
  let distanceOf: DistanceOf;
  let unit: any;

  beforeEach(() => {
    unit = { getDistanceOf: vi.fn() };
    distanceOf = new DistanceOf(unit);
  });

  test('is a sense', () => {
    expect(distanceOf).toBeInstanceOf(Sense);
  });

  test('has a description', () => {
    expect(distanceOf.description).toBe(
      'Returns an integer representing the distance to the given space.',
    );
  });

  test('has meta for type generation', () => {
    expect(distanceOf.meta).toEqual({
      params: [{ name: 'space', type: 'Space' }],
      returns: 'number',
    });
  });

  describe('performing', () => {
    test('returns distance of specified space', () => {
      unit.getDistanceOf.mockReturnValue(3);
      expect(distanceOf.perform()).toBe(3);
    });
  });
});
