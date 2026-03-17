import { Sense } from '@warriorjs/core';
import { FORWARD, LEFT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Look from './Look.js';

describe('Look', () => {
  let look: Look;
  let unit: any;

  beforeEach(() => {
    unit = { getSensedSpaceAt: vi.fn() };
    look = new Look(unit, { range: 3 });
  });

  test('is a sense', () => {
    expect(look).toBeInstanceOf(Sense);
  });

  test('has a description', () => {
    expect(look.description).toBe(
      `Returns an array of up to 3 spaces in the given direction (\`'${FORWARD}'\` by default).`,
    );
  });

  test('has meta for type generation', () => {
    expect(look.meta).toEqual({
      params: [{ name: 'direction', type: 'Direction', optional: true }],
      returns: 'Space[]',
    });
  });

  test('.with() returns an AbilityBinding', () => {
    const binding = Look.with({ range: 3 });
    expect(binding).toEqual([Look, { range: 3 }]);
  });

  describe('performing', () => {
    test('looks forward by default', () => {
      look.perform();
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD, 1);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD, 2);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(FORWARD, 3);
    });

    test('allows to specify direction', () => {
      look.perform(LEFT);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(LEFT, 1);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(LEFT, 2);
      expect(unit.getSensedSpaceAt).toHaveBeenCalledWith(LEFT, 3);
    });

    test('returns spaces in range in specified direction', () => {
      const space1 = { isWall: () => false };
      const space2 = { isWall: () => false };
      const space3 = { isWall: () => false };
      const space4 = { isWall: () => false };

      unit.getSensedSpaceAt
        .mockReturnValueOnce(space1)
        .mockReturnValueOnce(space2)
        .mockReturnValueOnce(space3)
        .mockReturnValueOnce(space4);
      expect(look.perform()).toEqual([space1, space2, space3]);
    });

    test("can't see through walls", () => {
      const space1 = { isWall: () => false };
      const space2 = { isWall: () => true };
      const space3 = { isWall: () => false };

      unit.getSensedSpaceAt
        .mockReturnValueOnce(space1)
        .mockReturnValueOnce(space2)
        .mockReturnValueOnce(space3);

      expect(look.perform()).toEqual([space1, space2]);
    });
  });
});
