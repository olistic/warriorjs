import { Action } from '@warriorjs/core';
import { FORWARD, LEFT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Bind from './Bind.js';

describe('Bind', () => {
  let bind: Bind;
  let unit: any;

  beforeEach(() => {
    unit = { log: vi.fn() };
    bind = new Bind(unit);
  });

  test('is an action', () => {
    expect(bind).toBeInstanceOf(Action);
  });

  test('has a description', () => {
    expect(bind.description).toBe(
      `Binds a unit in the given direction (\`'${FORWARD}'\` by default) to keep them from moving.`,
    );
  });

  test('has meta for type generation', () => {
    expect(bind.meta).toEqual({
      params: [{ name: 'direction', type: 'Direction', optional: true }],
      returns: 'void',
    });
  });

  describe('performing', () => {
    test('binds forward by default', () => {
      unit.getSpaceAt = vi.fn(() => ({ getUnit: () => null }));
      bind.perform();
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      unit.getSpaceAt = vi.fn(() => ({ getUnit: () => null }));
      bind.perform(LEFT);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT);
    });

    test('misses if no receiver', () => {
      unit.getSpaceAt = () => ({ getUnit: () => null });
      bind.perform();
      expect(unit.log).toHaveBeenCalledWith(`binds ${FORWARD} and restricts nothing`);
    });

    describe('with receiver', () => {
      let receiver: any;

      beforeEach(() => {
        receiver = {
          bind: vi.fn(),
          toString: () => 'receiver',
        };
        unit.getSpaceAt = () => ({ getUnit: () => receiver });
      });

      test('binds receiver', () => {
        bind.perform();
        expect(unit.log).toHaveBeenCalledWith(`binds ${FORWARD} and restricts receiver`);
        expect(receiver.bind).toHaveBeenCalled();
      });
    });
  });
});
