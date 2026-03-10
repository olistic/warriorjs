import { describe, test, expect, beforeEach, vi } from 'vitest';
import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/geography';

import directionOfCreator from './directionOf.js';

describe('directionOf', () => {
  let directionOf: ReturnType<ReturnType<typeof directionOfCreator>>;
  let unit: any;

  beforeEach(() => {
    unit = { getDirectionOf: vi.fn() };
    directionOf = directionOfCreator()(unit);
  });

  test('is not an action', () => {
    expect(directionOf.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(directionOf.description).toBe(
      `Returns the direction (${FORWARD}, ${RIGHT}, ${BACKWARD} or ${LEFT}) to the given space.`,
    );
  });

  describe('performing', () => {
    test('returns direction of specified space', () => {
      unit.getDirectionOf.mockReturnValue(RIGHT);
      expect(directionOf.perform()).toBe(RIGHT);
    });
  });
});
