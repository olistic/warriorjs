import { FORWARD, LEFT } from '@warriorjs/geography';

import detonateCreator from './detonate';

describe('detonate', () => {
  let detonate;
  let unit;

  beforeEach(() => {
    unit = {
      damage: jest.fn(),
      isUnderEffect: () => false,
      log: jest.fn(),
    };
    detonate = detonateCreator({ targetPower: 4, surroundingPower: 2 })(unit);
  });

  test('is an action', () => {
    expect(detonate.action).toBe(true);
  });

  test('has a description', () => {
    expect(detonate.description).toBe(
      `Detonate a bomb in a given direction (${FORWARD} by default) dealing 4 HP of damage to that space and 2 HP of damage to surrounding 4 spaces (including yourself).`,
    );
  });

  describe('performing', () => {
    test('detonates forward by default', () => {
      unit.getSpaceAt = jest.fn(() => ({ getUnit: () => null }));
      detonate.perform();
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      unit.getSpaceAt = jest.fn(() => ({ getUnit: () => null }));
      detonate.perform(LEFT);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT);
    });

    test('damages receivers depending on their position', () => {
      const targetReceiver = { isUnderEffect: () => false };
      const surroundingReceiver = { isUnderEffect: () => false };
      unit.getSpaceAt = jest
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

    test('damages receivers depending on their position', () => {
      const receiver = {
        isUnderEffect: () => true,
        triggerEffect: jest.fn(),
        log: jest.fn(),
      };
      unit.getSpaceAt = jest
        .fn()
        .mockReturnValueOnce({ getUnit: () => receiver })
        .mockReturnValue({ getUnit: () => null });
      detonate.perform();
      expect(receiver.log).toHaveBeenCalledWith(
        "caught in bomb's flames which detonates ticking explosive",
      );
      expect(receiver.triggerEffect).toHaveBeenCalledWith('ticking');
    });
  });
});
