import { FORWARD, RIGHT } from '@warriorjs/geography';

import rescueCreator from './rescue';

describe('rescue', () => {
  let rescue;
  let unit;

  beforeEach(() => {
    unit = {
      release: jest.fn(),
      log: jest.fn(),
    };
    rescue = rescueCreator()(unit);
  });

  test('is an action', () => {
    expect(rescue.action).toBe(true);
  });

  test('has a description', () => {
    expect(rescue.description).toBe(
      `Release a unit from his chains in the given direction (${FORWARD} by default).`,
    );
  });

  describe('performing', () => {
    test('rescues forward by default', () => {
      unit.getSpaceAt = jest.fn(() => ({ getUnit: () => null }));
      rescue.perform();
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      unit.getSpaceAt = jest.fn(() => ({ getUnit: () => null }));
      rescue.perform(RIGHT);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(RIGHT);
    });

    test('misses if no receiver', () => {
      unit.getSpaceAt = () => ({ getUnit: () => null });
      rescue.perform();
      expect(unit.log).toHaveBeenCalledWith(
        `unbinds ${FORWARD} and rescues nothing`,
      );
    });

    describe('with receiver', () => {
      let receiver;

      beforeEach(() => {
        receiver = {
          isBound: () => true,
          toString: () => 'receiver',
        };
        unit.getSpaceAt = () => ({ getUnit: () => receiver });
      });

      test("does nothing to receiver if it's not bound", () => {
        receiver.isBound = () => false;
        rescue.perform();
        expect(unit.log).toHaveBeenCalledWith(
          `unbinds ${FORWARD} and rescues nothing`,
        );
        expect(unit.release).not.toHaveBeenCalled();
      });

      test('releases receiver', () => {
        rescue.perform();
        expect(unit.log).toHaveBeenCalledWith(
          `unbinds ${FORWARD} and rescues receiver`,
        );
        expect(unit.release).toHaveBeenCalledWith(receiver);
      });
    });
  });
});
