import { Sense } from '@warriorjs/core';
import { beforeEach, describe, expect, test } from 'vitest';
import Health from './Health.js';

describe('Health', () => {
  let health: Health;
  let unit: any;

  beforeEach(() => {
    unit = { health: 10 };
    health = new Health(unit);
  });

  test('is a sense', () => {
    expect(health).toBeInstanceOf(Sense);
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
