import { FORWARD, RIGHT } from '@warriorjs/geography';

import rescueCreator from './rescue';

describe('rescue', () => {
  let rescue;
  let unit;

  beforeEach(() => {
    unit = {
      earnPoints: jest.fn(),
      say: jest.fn(),
    };
    rescue = rescueCreator()(unit);
  });

  test('is an action', () => {
    expect(rescue.action).toBe(true);
  });

  test('has a description', () => {
    expect(rescue.description).toBe(
      `Rescue a captive from his chains (earning a reward) in the given direction (${FORWARD} by default).`,
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
      expect(unit.say).toHaveBeenCalledWith(
        `unbinds ${FORWARD} and rescues nothing`,
      );
    });

    describe('with receiver', () => {
      let receiver;

      beforeEach(() => {
        receiver = {
          isBound: () => true,
          isFriendly: () => false,
          unbind: jest.fn(),
          vanish: jest.fn(),
          toString: () => 'receiver',
          reward: 20,
        };
        unit.getSpaceAt = () => ({ getUnit: () => receiver });
      });

      test("does nothing to receiver if it's not bound", () => {
        receiver.isBound = () => false;
        rescue.perform();
        expect(unit.say).toHaveBeenCalledWith(
          `unbinds ${FORWARD} and rescues nothing`,
        );
      });

      test('rescues receiver', () => {
        rescue.perform();
        expect(unit.say).toHaveBeenCalledWith(
          `unbinds ${FORWARD} and rescues receiver`,
        );
        expect(receiver.unbind).toHaveBeenCalled();
      });

      test('earns points if rescuing a captive', () => {
        receiver.isFriendly = () => true;
        rescue.perform();
        expect(receiver.vanish).toHaveBeenCalled();
        expect(unit.earnPoints).toHaveBeenCalledWith(20);
      });
    });
  });
});
