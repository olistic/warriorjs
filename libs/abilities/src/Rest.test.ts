import { Action } from '@warriorjs/core';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Rest from './Rest.js';

describe('Rest', () => {
  let rest: Rest;
  let unit: any;

  beforeEach(() => {
    unit = {
      maxHealth: 20,
      health: 10,
      heal: vi.fn(),
      log: vi.fn(),
    };
    rest = new Rest(unit, { healthGain: 0.1 });
  });

  test('is an action', () => {
    expect(rest).toBeInstanceOf(Action);
  });

  test('has a description', () => {
    expect(rest.description).toBe('Gains 10% of max health back, but does nothing more.');
  });

  test('has meta for type generation', () => {
    expect(rest.meta).toEqual({
      params: [],
      returns: 'void',
    });
  });

  test('.with() returns an AbilityBinding', () => {
    const binding = Rest.with({ healthGain: 0.1 });
    expect(binding).toEqual([Rest, { healthGain: 0.1 }]);
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
      expect(unit.log).toHaveBeenCalledWith('has nothing to heal');
      expect(unit.heal).not.toHaveBeenCalled();
    });
  });
});
