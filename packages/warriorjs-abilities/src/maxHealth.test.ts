import { describe, test, expect, beforeEach } from 'vitest';

import maxHealthCreator from './maxHealth.js';

describe('maxHealth', () => {
  let maxHealth: ReturnType<ReturnType<typeof maxHealthCreator>>;
  let unit: any;

  beforeEach(() => {
    unit = { maxHealth: 10 };
    maxHealth = maxHealthCreator()(unit);
  });

  test('is not an action', () => {
    expect(maxHealth.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(maxHealth.description).toBe(
      'Returns an integer representing your maximum health.',
    );
  });

  describe('performing', () => {
    test('returns the maximum health', () => {
      expect(maxHealth.perform()).toBe(10);
    });
  });
});
