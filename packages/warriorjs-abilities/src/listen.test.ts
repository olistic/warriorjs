import { FORWARD, NORTH } from '@warriorjs/geography';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import listenCreator from './listen.js';

describe('listen', () => {
  let listen: ReturnType<ReturnType<typeof listenCreator>>;
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
    listen = listenCreator()(unit);
  });

  test('is not an action', () => {
    expect(listen.action).toBeUndefined();
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
