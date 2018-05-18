import { FORWARD, RIGHT } from '@warriorjs/geography';

import walkCreator from './walk';

describe('walk', () => {
  let walk;
  let unit;

  beforeEach(() => {
    unit = {
      move: jest.fn(),
      log: jest.fn(),
    };
    walk = walkCreator()(unit);
  });

  test('is an action', () => {
    expect(walk.action).toBe(true);
  });

  test('has a description', () => {
    expect(walk.description).toBe(
      `Move one space in the given direction (${FORWARD} by default).`,
    );
  });

  describe('performing', () => {
    test('walks forward by default', () => {
      unit.getSpaceAt = jest.fn(() => ({ isEmpty: () => true }));
      walk.perform();
      expect(unit.getSpaceAt).toHaveBeenCalledWith(FORWARD);
    });

    test('allows to specify direction', () => {
      unit.getSpaceAt = jest.fn(() => ({ isEmpty: () => true }));
      walk.perform(RIGHT);
      expect(unit.getSpaceAt).toHaveBeenCalledWith(RIGHT);
    });

    test('keeps position if something is in the way', () => {
      unit.getSpaceAt = () => ({
        isEmpty: () => false,
        toString: () => 'space',
      });
      walk.perform();
      expect(unit.log).toHaveBeenCalledWith(`walks ${FORWARD}`);
      expect(unit.log).toHaveBeenLastCalledWith('bumps into space');
      expect(unit.move).not.toHaveBeenCalled();
    });

    test('moves in specified direction if space if empty', () => {
      unit.getSpaceAt = () => ({ isEmpty: () => true });
      walk.perform(RIGHT);
      expect(unit.log).toHaveBeenCalledWith(`walks ${RIGHT}`);
      expect(unit.move).toHaveBeenCalledWith(RIGHT);
    });
  });
});
