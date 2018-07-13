import { EAST, FORWARD, WEST } from '@warriorjs/geography';

import Floor from './Floor';
import Level from './Level';
import Unit from './Unit';
import Warrior from './Warrior';

describe('Level', () => {
  let floor;
  let level;
  let warrior;

  beforeEach(() => {
    warrior = new Warrior();
    warrior.log = jest.fn();
    floor = new Floor(2, 1, [1, 0]);
    floor.addUnit(warrior, { x: 0, y: 0, facing: EAST });
    floor.warrior = warrior;
    level = new Level(1, 'a description', 'a tip', 'a clue', 10, floor);
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

    test('counts down time bonus once each turn', () => {
      level.play(3);
      expect(level.timeBonus).toBe(7);
    });

    test('does not count down time bonus below zero', () => {
      level.play(11);
      expect(level.timeBonus).toBe(0);
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

  describe('score', () => {
    test('has warrior score', () => {
      warrior.score = 8;
      expect(level.getScore().warrior).toBe(8);
    });

    test('has time bonus', () => {
      expect(level.getScore().timeBonus).toBe(10);
    });

    test('has clear bonus when the level is cleared', () => {
      warrior.getOtherUnits = () => [];
      warrior.score = 8;
      expect(level.getScore().clearBonus).toBe(4);
    });

    test("doesn't have clear bonus when the level is not cleared", () => {
      warrior.getOtherUnits = () => [new Unit()];
      expect(level.getScore().clearBonus).toBe(0);
    });
  });

  test('considers cleared when there are no units other than the warrior', () => {
    const unit = new Unit();
    floor.addUnit(unit, { x: 1, y: 0, facing: WEST });
    expect(level.isCleared()).toBe(false);
    unit.isAlive = () => false;
    expect(level.isCleared()).toBe(true);
  });

  test('has a minimal JSON representation', () => {
    expect(level.toJSON()).toEqual({
      number: 1,
      description: 'a description',
      tip: 'a tip',
      clue: 'a clue',
      floorMap: level.floor.getMap(),
      warriorAbilities: level.floor.warrior.getAbilities(),
    });
  });
});
