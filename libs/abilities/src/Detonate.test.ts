import { Action } from '@warriorjs/core';
import { FORWARD, LEFT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Detonate from './Detonate.js';

describe('Detonate', () => {
  let detonate: Detonate;
  let unit: any;

  beforeEach(() => {
    unit = {
      damage: vi.fn(),
      isUnderEffect: () => false,
      log: vi.fn(),
    };
    detonate = new Detonate(unit, { targetPower: 4, surroundingPower: 2 });
  });

  test('is an action', () => {
    expect(detonate).toBeInstanceOf(Action);
  });

  test('has a description', () => {
    expect(detonate.description).toBe(
      `Detonates a bomb in a given direction (\`'${FORWARD}'\` by default), dealing 4 HP of damage to that space and 2 HP of damage to surrounding 4 spaces (including yourself).`,
    );
  });

  test('has meta for type generation', () => {
    expect(detonate.meta).toEqual({
      params: [{ name: 'direction', type: 'Direction', optional: true }],
      returns: 'void',
    });
  });

  test('.with() returns an AbilityBinding', () => {
    const binding = Detonate.with({ targetPower: 4, surroundingPower: 2 });
    expect(binding).toEqual([Detonate, { targetPower: 4, surroundingPower: 2 }]);
  });

  describe('performing', () => {
    test('detonates forward by default', () => {
      unit.getSpaceAt = vi.fn(() => ({ getUnit: () => null }));
      detonate.perform();
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      unit.getSpaceAt = vi.fn(() => ({ getUnit: () => null }));
      detonate.perform(LEFT);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT);
    });

    test('damages receivers depending on their position', () => {
      const targetReceiver = { isUnderEffect: () => false };
      const surroundingReceiver = { isUnderEffect: () => false };
      unit.getSpaceAt = vi
        .fn()
        .mockReturnValueOnce({ getUnit: () => targetReceiver })
        .mockReturnValueOnce({ getUnit: () => null })
        .mockReturnValueOnce({ getUnit: () => null })
        .mockReturnValueOnce({ getUnit: () => surroundingReceiver })
        .mockReturnValueOnce({ getUnit: () => unit });
      detonate.perform();
      expect(unit.log).toHaveBeenCalledWith(
        `detonates a bomb ${FORWARD} launching a deadly explosion`,
      );
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD, 1, 1);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD, 1, -1);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD, 2, 0);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD, 0, 0);
      expect(unit.damage).toHaveBeenCalledWith(targetReceiver, 4);
      expect(unit.damage).toHaveBeenCalledWith(surroundingReceiver, 2);
      expect(unit.damage).toHaveBeenCalledWith(unit, 2);
    });

    test('triggers ticking effect on receivers under effect', () => {
      const receiver = {
        isUnderEffect: () => true,
        triggerEffect: vi.fn(),
        log: vi.fn(),
      };
      unit.getSpaceAt = vi
        .fn()
        .mockReturnValueOnce({ getUnit: () => receiver })
        .mockReturnValue({ getUnit: () => null });
      detonate.perform();
      expect(receiver.log).toHaveBeenCalledWith(
        'caught in the blast, detonating the ticking explosive',
      );
      expect(receiver.triggerEffect).toHaveBeenCalledWith('ticking');
    });
  });
});
