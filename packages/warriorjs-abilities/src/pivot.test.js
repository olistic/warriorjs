import { BACKWARD, RIGHT } from '@warriorjs/geography';

import pivotCreator from './pivot';

describe('pivot', () => {
  let pivot;
  let unit;

  beforeEach(() => {
    unit = {
      rotate: jest.fn(),
      say: jest.fn(),
    };
    pivot = pivotCreator()(unit);
  });

  test('is an action', () => {
    expect(pivot.action).toBe(true);
  });

  test('has a description', () => {
    expect(pivot.description).toBe(
      `Rotate in the given direction (${BACKWARD} by default).`,
    );
  });

  describe('performing', () => {
    test('flips around when not passing direction', () => {
      pivot.perform();
      expect(unit.say).toHaveBeenCalledWith(`pivots ${BACKWARD}`);
      expect(unit.rotate).toHaveBeenCalledWith(BACKWARD);
    });

    test('rotates in specified direction', () => {
      pivot.perform(RIGHT);
      expect(unit.say).toHaveBeenCalledWith(`pivots ${RIGHT}`);
      expect(unit.rotate).toHaveBeenCalledWith(RIGHT);
    });
  });
});
