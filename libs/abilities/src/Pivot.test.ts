import { Action } from '@warriorjs/core';
import { BACKWARD, RIGHT } from '@warriorjs/spatial';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Pivot from './Pivot.js';

describe('Pivot', () => {
  let pivot: Pivot;
  let unit: any;

  beforeEach(() => {
    unit = {
      rotate: vi.fn(),
      log: vi.fn(),
    };
    pivot = new Pivot(unit);
  });

  test('is an action', () => {
    expect(pivot).toBeInstanceOf(Action);
  });

  test('has a description', () => {
    expect(pivot.description).toBe(
      `Rotates in the given direction (\`'${BACKWARD}'\` by default).`,
    );
  });

  test('has meta for type generation', () => {
    expect(pivot.meta).toEqual({
      params: [{ name: 'direction', type: 'Direction', optional: true }],
      returns: 'void',
    });
  });

  describe('performing', () => {
    test('flips around when not passing direction', () => {
      pivot.perform();
      expect(unit.log).toHaveBeenCalledWith(`pivots ${BACKWARD}`);
      expect(unit.rotate).toHaveBeenCalledWith(BACKWARD);
    });

    test('rotates in specified direction', () => {
      pivot.perform(RIGHT);
      expect(unit.log).toHaveBeenCalledWith(`pivots ${RIGHT}`);
      expect(unit.rotate).toHaveBeenCalledWith(RIGHT);
    });
  });
});
