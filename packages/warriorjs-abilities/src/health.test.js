import healthCreator from './health';

describe('health', () => {
  let health;
  let unit;

  beforeEach(() => {
    unit = { health: 10 };
    health = healthCreator()(unit);
  });

  test('is not an action', () => {
    expect(health.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(health.description).toBe(
      'Return an integer representing your health.',
    );
  });

  describe('performing', () => {
    test('returns the amount of health', () => {
      expect(health.perform()).toBe(10);
    });
  });
});
