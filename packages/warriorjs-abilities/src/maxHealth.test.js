import maxHealthCreator from './maxHealth';

describe('maxHealth', () => {
  let maxHealth;
  let unit;

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
