import { Action } from '@warriorjs/core';
import { FORWARD, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Rescue from './Rescue.js';

describe('Rescue', () => {
  let rescue: Rescue;
  let unit: any;

  beforeEach(() => {
    unit = {
      release: vi.fn(),
      log: vi.fn(),
    };
    rescue = new Rescue(unit);
  });

  test('is an action', () => {
    expect(rescue).toBeInstanceOf(Action);
  });

  test('has a description', () => {
    expect(rescue.description).toBe(
      `Releases a unit from their chains in the given direction (\`'${FORWARD}'\` by default).`,
    );
  });

  test('has meta for type generation', () => {
    expect(rescue.meta).toEqual({
      params: [{ name: 'direction', type: 'Direction', optional: true }],
      returns: 'void',
    });
  });

  describe('performing', () => {
    test('rescues forward by default', () => {
      unit.getSpaceAt = vi.fn(() => ({ getUnit: () => null }));
      rescue.perform();
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      unit.getSpaceAt = vi.fn(() => ({ getUnit: () => null }));
      rescue.perform(RIGHT);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(RIGHT);
    });

    test('misses if no receiver', () => {
      unit.getSpaceAt = () => ({ getUnit: () => null });
      rescue.perform();
      expect(unit.log).toHaveBeenCalledWith(`unbinds ${FORWARD} and rescues nothing`);
    });

    describe('with receiver', () => {
      let receiver: any;

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
        expect(unit.log).toHaveBeenCalledWith(`unbinds ${FORWARD} and rescues nothing`);
        expect(unit.release).not.toHaveBeenCalled();
      });

      test('releases receiver', () => {
        rescue.perform();
        expect(unit.log).toHaveBeenCalledWith(`unbinds ${FORWARD} and rescues receiver`);
        expect(unit.release).toHaveBeenCalledWith(receiver);
      });
    });
  });
});
