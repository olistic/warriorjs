import tickingCreator from './ticking';

describe('ticking', () => {
  let ticking;
  let unit;

  beforeEach(() => {
    unit = {
      health: 20,
      takeDamage: jest.fn(),
      log: jest.fn(),
    };
    ticking = tickingCreator({ time: 3 })(unit);
  });

  test('has a description', () => {
    expect(ticking.description).toBe(
      'Kills you and all surrounding units when time reaches zero.',
    );
  });

  describe('passing turn', () => {
    test('counts down bomb timer once', () => {
      ticking.passTurn();
      expect(ticking.time).toBe(2);
      expect(unit.log).toHaveBeenCalledWith('is ticking');
    });

    test("doesn't count down bomb timer below zero", () => {
      ticking.trigger = () => {};
      ticking.time = 0;
      ticking.passTurn();
      expect(ticking.time).toBe(0);
    });

    test('triggers when bomb time reaches zero', () => {
      ticking.trigger = jest.fn();
      ticking.time = 2;
      ticking.passTurn();
      expect(ticking.trigger).not.toHaveBeenCalled();
      ticking.passTurn();
      expect(ticking.trigger).toHaveBeenCalled();
    });
  });

  describe('triggering', () => {
    test('kills each unit on the floor', () => {
      const anotherUnit = {
        health: 10,
        takeDamage: jest.fn(),
      };
      unit.getOtherUnits = () => [anotherUnit];
      ticking.trigger();
      expect(unit.log).toHaveBeenCalledWith(
        'explodes, collapsing the ceiling and killing every unit',
      );
      expect(anotherUnit.takeDamage).toHaveBeenCalledWith(10);
      expect(unit.takeDamage).toHaveBeenCalledWith(20);
    });
  });
});
