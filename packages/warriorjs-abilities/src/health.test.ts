import { beforeEach, describe, expect, test } from 'vitest';

import healthCreator from './health.js';

describe('health', () => {
  let health: ReturnType<ReturnType<typeof healthCreator>>;
  let unit: any;

  beforeEach(() => {
    unit = { health: 10 };
    health = healthCreator()(unit);
  });

  test('is not an action', () => {
    expect(health.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(health.description).toBe('Returns an integer representing your health.');
  });

  test('has meta for type generation', () => {
    expect(health.meta).toEqual({
      params: [],
      returns: 'number',
    });
  });

  describe('performing', () => {
    test('returns the amount of health', () => {
      expect(health.perform()).toBe(10);
    });
  });
});
