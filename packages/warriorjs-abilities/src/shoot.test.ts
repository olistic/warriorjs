import { describe, test, expect, beforeEach, vi } from 'vitest';
import { FORWARD, LEFT } from '@warriorjs/geography';

import shootCreator from './shoot.js';

describe('shoot', () => {
  let shoot: ReturnType<ReturnType<typeof shootCreator>>;
  let unit: any;

  beforeEach(() => {
    unit = {
      damage: vi.fn(),
      log: vi.fn(),
    };
    shoot = shootCreator({ power: 3, range: 3 })(unit);
  });

  test('is an action', () => {
    expect(shoot.action).toBe(true);
  });

  test('has a description', () => {
    expect(shoot.description).toBe(
      `Shoots the bow & arrow in the given direction (\`'${FORWARD}'\` by default), dealing 3 HP of damage to the first unit in a range of 3 spaces.`,
    );
  });

  describe('performing', () => {
    test('shoots forward by default', () => {
      unit.getSpaceAt = vi.fn(() => ({ getUnit: () => null }));
      shoot.perform();
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD, 1);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD, 2);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD, 3);
    });

    test('allows to specify direction', () => {
      unit.getSpaceAt = vi.fn(() => ({ getUnit: () => null }));
      shoot.perform(LEFT);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT, 1);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT, 2);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(LEFT, 3);
    });

    test('misses if no receiver', () => {
      unit.getSpaceAt = vi
        .fn()
        .mockReturnValueOnce({ getUnit: () => null })
        .mockReturnValueOnce({ getUnit: () => null })
        .mockReturnValueOnce({ getUnit: () => null })
        .mockReturnValueOnce({ getUnit: () => 'anotherUnit' });
      shoot.perform();
      expect(unit.log).toHaveBeenCalledWith(
        `shoots ${FORWARD} and hits nothing`,
      );
      expect(unit.damage).not.toHaveBeenCalled();
    });

    describe('with receiver', () => {
      beforeEach(() => {
        unit.getSpaceAt = vi
          .fn()
          .mockReturnValueOnce({ getUnit: () => null })
          .mockReturnValueOnce({ getUnit: () => 'receiver' })
          .mockReturnValueOnce({ getUnit: () => 'anotherUnit' });
      });

      test('damages receiver', () => {
        shoot.perform();
        expect(unit.log).toHaveBeenCalledWith(
          `shoots ${FORWARD} and hits receiver`,
        );
        expect(unit.damage).toHaveBeenCalledWith('receiver', 3);
      });

      test('shoots only first unit', () => {
        shoot.perform();
        expect(unit.damage).not.toHaveBeenCalledWith('anotherUnit', 3);
      });
    });
  });
});
