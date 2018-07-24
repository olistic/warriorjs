import { EAST, FORWARD } from '@warriorjs/geography';

import Floor from './Floor';
import Level from './Level';
import Warrior from './Warrior';

describe('Level', () => {
  let floor;
  let level;
  let warrior;

  beforeEach(() => {
    warrior = new Warrior('Joe', '@', '#8fbcbb', 20);
    warrior.log = jest.fn();
    floor = new Floor(2, 1, [1, 0]);
    floor.addUnit(warrior, { x: 0, y: 0, facing: EAST });
    floor.warrior = warrior;
    level = new Level(1, 'a description', 'a tip', 'a clue', floor);
  });

  describe('playing', () => {
    beforeEach(() => {
      warrior.prepareTurn = jest.fn();
      warrior.performTurn = jest.fn();
    });

    test('calls prepareTurn and playTurn on each unit once per turn', () => {
      level.play(2);
      expect(warrior.prepareTurn).toHaveBeenCalledTimes(2);
      expect(warrior.performTurn).toHaveBeenCalledTimes(2);
    });

    test('plays for a max number of turns which defaults to 200', () => {
      level.play();
      expect(warrior.prepareTurn).toHaveBeenCalledTimes(200);
      expect(warrior.performTurn).toHaveBeenCalledTimes(200);
    });

    test('returns immediately when passed', () => {
      level.wasPassed = () => true;
      level.play(2);
      expect(warrior.performTurn).not.toHaveBeenCalled();
    });

    test('returns immediately when failed', () => {
      level.wasFailed = () => true;
      level.play(2);
      expect(warrior.performTurn).not.toHaveBeenCalled();
    });
  });

  test('considers passed when warrior is on stairs', () => {
    warrior.move(FORWARD);
    expect(level.wasPassed()).toBe(true);
  });

  test('considers failed when warrior is dead', () => {
    warrior.isAlive = () => false;
    expect(level.wasFailed()).toBe(true);
  });

  test('has a minimal JSON representation', () => {
    expect(level.toJSON()).toEqual({
      number: 1,
      description: 'a description',
      tip: 'a tip',
      clue: 'a clue',
      floorMap: level.floor.getMap(),
      warriorStatus: level.floor.warrior.getStatus(),
      warriorAbilities: level.floor.warrior.getAbilities(),
    });
  });
});
