import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/geography';

import directionOfCreator from './directionOf';

describe('directionOf', () => {
  let directionOf;
  let unit;

  beforeEach(() => {
    unit = { getDirectionOf: jest.fn() };
    directionOf = directionOfCreator()(unit);
  });

  test('is not an action', () => {
    expect(directionOf.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(directionOf.description).toBe(
      `Return the direction (${FORWARD}, ${RIGHT}, ${BACKWARD} or ${LEFT}) to the given space.`,
    );
  });

  describe('performing', () => {
    test('returns direction of specified space', () => {
      unit.getDirectionOf.mockReturnValue(RIGHT);
      expect(directionOf.perform()).toBe(RIGHT);
    });
  });
});
