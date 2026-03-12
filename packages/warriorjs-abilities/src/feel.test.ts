import { FORWARD, LEFT } from '@warriorjs/geography';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import feelCreator from './feel.js';

describe('feel', () => {
  let feel: ReturnType<ReturnType<typeof feelCreator>>;
  let unit: any;

  beforeEach(() => {
    unit = { getSensedSpaceAt: vi.fn() };
    feel = feelCreator()(unit);
  });

  test('is not an action', () => {
    expect(feel.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(feel.description).toBe(
      `Returns the adjacent space in the given direction (\`'${FORWARD}'\` by default).`,
    );
  });

  test('has meta for type generation', () => {
    expect(feel.meta).toEqual({
      params: [{ name: 'direction', type: 'Direction', optional: true }],
      returns: 'Space',
    });
  });

  describe('performing', () => {
    test('feels forward by default', () => {
      feel.perform();
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      feel.perform(LEFT);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(LEFT);
    });

    test('returns adjacent space in specified direction', () => {
      unit.getSensedSpaceAt.mockReturnValue('space');
      expect(feel.perform()).toBe('space');
    });
  });
});
