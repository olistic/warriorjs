import { Action } from '@warriorjs/core';
import { BACKWARD, FORWARD, LEFT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Attack from './Attack.js';

describe('Attack', () => {
  let attack: Attack;
  let unit: any;

  beforeEach(() => {
    unit = {
      damage: vi.fn(),
      log: vi.fn(),
    };
    attack = new Attack(unit, { power: 3 });
  });

  test('is an action', () => {
    expect(attack).toBeInstanceOf(Action);
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

  test('.with() returns an AbilityBinding', () => {
    const binding = Attack.with({ power: 5 });
    expect(binding).toEqual([Attack, { power: 5 }]);
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
