import { describe, test, expect, beforeEach, vi } from 'vitest';
import { FORWARD, LEFT } from '@warriorjs/geography';

import bindCreator from './bind.js';

describe('bind', () => {
  let bind: ReturnType<ReturnType<typeof bindCreator>>;
  let unit: any;

  beforeEach(() => {
    unit = { log: vi.fn() };
    bind = bindCreator()(unit);
  });

  test('is an action', () => {
    expect(bind.action).toBe(true);
  });

  test('has a description', () => {
    expect(bind.description).toBe(
      `Binds a unit in the given direction (\`'${FORWARD}'\` by default) to keep him from moving.`,
    );
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
      expect(unit.log).toHaveBeenCalledWith(
        `binds ${FORWARD} and restricts nothing`,
      );
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
        expect(unit.log).toHaveBeenCalledWith(
          `binds ${FORWARD} and restricts receiver`,
        );
        expect(receiver.bind).toHaveBeenCalled();
      });
    });
  });
});
