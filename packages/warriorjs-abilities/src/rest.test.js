import restCreator from './rest';

describe('rest', () => {
  let rest;
  let unit;

  beforeEach(() => {
    unit = {
      maxHealth: 20,
      health: 10,
      heal: jest.fn(),
      log: jest.fn(),
    };
    rest = restCreator({ healthGain: 0.1 })(unit);
  });

  test('is an action', () => {
    expect(rest.action).toBe(true);
  });

  test('has a description', () => {
    expect(rest.description).toBe(
      'Gain 10% of max health back, but do nothing more.',
    );
  });

  describe('performing', () => {
    test('gives health back', () => {
      rest.perform();
      expect(unit.log).toHaveBeenCalledWith('rests');
      expect(unit.heal).toHaveBeenCalledWith(2);
    });

    test("doesn't add health when at max", () => {
      unit.health = 20;
      rest.perform();
      expect(unit.log).toHaveBeenCalledWith('is already fit as a fiddle');
      expect(unit.heal).not.toHaveBeenCalled();
    });
  });
});
