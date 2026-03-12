import { BACKWARD, FORWARD, LEFT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import attackCreator from './attack.js';

describe('attack', () => {
  let attack: ReturnType<ReturnType<typeof attackCreator>>;
  let unit: any;

  beforeEach(() => {
    unit = {
      damage: vi.fn(),
      log: vi.fn(),
    };
    attack = attackCreator({ power: 3 })(unit);
  });

  test('is an action', () => {
    expect(attack.action).toBe(true);
  });

  test('has a description', () => {
    expect(attack.description).toBe(
      `Attacks a unit in the given direction (\`'${FORWARD}'\` by default), dealing 3 HP of damage.`,
    );
  });

  test('has meta for type generation', () => {
    expect(attack.meta).toEqual({
      params: [{ name: 'direction', type: 'Direction', optional: true }],
      returns: 'void',
    });
  });

  describe('performing', () => {
    test('attacks forward by default', () => {
      unit.getSpaceAt = vi.fn(() => ({ getUnit: () => null }));
      attack.perform();
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      unit.getSpaceAt = vi.fn(() => ({ getUnit: () => null }));
      attack.perform(LEFT);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT);
    });

    test('misses if no receiver', () => {
      unit.getSpaceAt = () => ({ getUnit: () => null });
      attack.perform();
      expect(unit.log).toHaveBeenCalledWith(`attacks ${FORWARD} and hits nothing`);
      expect(unit.damage).not.toHaveBeenCalled();
    });

    describe('with receiver', () => {
      beforeEach(() => {
        unit.getSpaceAt = () => ({ getUnit: () => 'receiver' });
      });

      test('damages receiver', () => {
        attack.perform();
        expect(unit.log).toHaveBeenCalledWith(`attacks ${FORWARD} and hits receiver`);
        expect(unit.damage).toHaveBeenCalledWith('receiver', 3);
      });

      test('reduces power when attacking backward', () => {
        attack.perform(BACKWARD);
        expect(unit.log).toHaveBeenCalledWith(`attacks ${BACKWARD} and hits receiver`);
        expect(unit.damage).toHaveBeenCalledWith('receiver', 2);
      });
    });
  });
});
