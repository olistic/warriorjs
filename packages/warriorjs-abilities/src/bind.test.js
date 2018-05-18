import { FORWARD, LEFT } from '@warriorjs/geography';

import bindCreator from './bind';

describe('bind', () => {
  let bind;
  let unit;

  beforeEach(() => {
    unit = { log: jest.fn() };
    bind = bindCreator()(unit);
  });

  test('is an action', () => {
    expect(bind.action).toBe(true);
  });

  test('has a description', () => {
    expect(bind.description).toBe(
      `Bind a unit in the given direction (${FORWARD} by default) to keep him from moving.`,
    );
  });

  describe('performing', () => {
    test('binds forward by default', () => {
      unit.getSpaceAt = jest.fn(() => ({ getUnit: () => null }));
      bind.perform();
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      unit.getSpaceAt = jest.fn(() => ({ getUnit: () => null }));
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
      let receiver;

      beforeEach(() => {
        receiver = {
          bind: jest.fn(),
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
