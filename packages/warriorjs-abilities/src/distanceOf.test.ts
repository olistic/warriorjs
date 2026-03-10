import { describe, test, expect, beforeEach, vi } from 'vitest';

import distanceOfCreator from './distanceOf.js';

describe('distanceOf', () => {
  let distanceOf: ReturnType<ReturnType<typeof distanceOfCreator>>;
  let unit: any;

  beforeEach(() => {
    unit = { getDistanceOf: vi.fn() };
    distanceOf = distanceOfCreator()(unit);
  });

  test('is not an action', () => {
    expect(distanceOf.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(distanceOf.description).toBe(
      'Returns an integer representing the distance to the given space.',
    );
  });

  describe('performing', () => {
    test('returns distance of specified space', () => {
      unit.getDistanceOf.mockReturnValue(3);
      expect(distanceOf.perform()).toBe(3);
    });
  });
});
