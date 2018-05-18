import { BACKWARD, FORWARD, LEFT } from '@warriorjs/geography';

import attackCreator from './attack';

describe('attack', () => {
  let attack;
  let unit;

  beforeEach(() => {
    unit = {
      damage: jest.fn(),
      log: jest.fn(),
    };
    attack = attackCreator({ power: 3 })(unit);
  });

  test('is an action', () => {
    expect(attack.action).toBe(true);
  });

  test('has a description', () => {
    expect(attack.description).toBe(
      `Attack a unit in the given direction (${FORWARD} by default) dealing 3 HP of damage.`,
    );
  });

  describe('performing', () => {
    test('attacks forward by default', () => {
      unit.getSpaceAt = jest.fn(() => ({ getUnit: () => null }));
      attack.perform();
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      unit.getSpaceAt = jest.fn(() => ({ getUnit: () => null }));
      attack.perform(LEFT);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT);
    });

    test('misses if no receiver', () => {
      unit.getSpaceAt = () => ({ getUnit: () => null });
      attack.perform();
      expect(unit.log).toHaveBeenCalledWith(
        `attacks ${FORWARD} and hits nothing`,
      );
      expect(unit.damage).not.toHaveBeenCalled();
    });

    describe('with receiver', () => {
      beforeEach(() => {
        unit.getSpaceAt = () => ({ getUnit: () => 'receiver' });
      });

      test('damages receiver', () => {
        attack.perform();
        expect(unit.log).toHaveBeenCalledWith(
          `attacks ${FORWARD} and hits receiver`,
        );
        expect(unit.damage).toHaveBeenCalledWith('receiver', 3);
      });

      test('reduces power when attacking backward', () => {
        attack.perform(BACKWARD);
        expect(unit.log).toHaveBeenCalledWith(
          `attacks ${BACKWARD} and hits receiver`,
        );
        expect(unit.damage).toHaveBeenCalledWith('receiver', 2);
      });
    });
  });
});
