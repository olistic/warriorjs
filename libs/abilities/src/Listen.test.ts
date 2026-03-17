import { Sense } from '@warriorjs/core';
import { FORWARD, NORTH } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Listen from './Listen.js';

describe('Listen', () => {
  let listen: Listen;
  let unit: any;

  beforeEach(() => {
    unit = {
      position: {
        location: [1, 1],
        orientation: NORTH,
      },
      getOtherUnits: () => [
        { getSpace: () => ({ location: [0, 0] }) },
        { getSpace: () => ({ location: [2, 3] }) },
      ],
      getSensedSpaceAt: vi.fn(),
    };
    listen = new Listen(unit);
  });

  test('is a sense', () => {
    expect(listen).toBeInstanceOf(Sense);
  });

  test('has a description', () => {
    expect(listen.description).toBe(
      'Returns an array of all spaces which have units in them (excluding yourself).',
    );
  });

  test('has meta for type generation', () => {
    expect(listen.meta).toEqual({
      params: [],
      returns: 'Space[]',
    });
  });

  describe('performing', () => {
    test('returns all spaces which have units in them', () => {
      unit.getSensedSpaceAt.mockReturnValueOnce('space1').mockReturnValueOnce('space2');
      expect(listen.perform()).toEqual(['space1', 'space2']);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD, 1, -1);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD, -2, 1);
    });
  });
});
