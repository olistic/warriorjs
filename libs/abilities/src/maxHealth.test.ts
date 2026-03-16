import { beforeEach, describe, expect, test } from 'vitest';
import MaxHealth from './maxHealth.js';
import Sense from './Sense.js';

describe('MaxHealth', () => {
  let maxHealth: MaxHealth;
  let unit: any;

  beforeEach(() => {
    unit = { maxHealth: 10 };
    maxHealth = new MaxHealth(unit);
  });

  test('is a sense', () => {
    expect(maxHealth).toBeInstanceOf(Sense);
  });

  test('has a description', () => {
    expect(maxHealth.description).toBe('Returns an integer representing your maximum health.');
  });

  test('has meta for type generation', () => {
    expect(maxHealth.meta).toEqual({
      params: [],
      returns: 'number',
    });
  });

  describe('performing', () => {
    test('returns the maximum health', () => {
      expect(maxHealth.perform()).toBe(10);
    });
  });
});
