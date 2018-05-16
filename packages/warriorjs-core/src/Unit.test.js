import { BACKWARD, FORWARD, LEFT, NORTH, RIGHT } from '@warriorjs/geography';

import Floor from './Floor';
import Unit from './Unit';

describe('Unit', () => {
  let unit;
  let floor;

  beforeEach(() => {
    unit = new Unit('Joe', '@', 20, 30);
    unit.say = jest.fn();
    floor = new Floor(5, 6, [0, 0]);
    floor.addUnit(unit, { x: 1, y: 2, facing: NORTH });
  });

  test('has a name', () => {
    expect(unit.name).toBe('Joe');
  });

  test('has a character that represents it', () => {
    expect(unit.character).toBe('@');
  });

  test('has a max health', () => {
    expect(unit.maxHealth).toBe(20);
  });

  describe('has a reward', () => {
    test('which is as assigned', () => {
      expect(unit.reward).toBe(30);
    });

    test('which defaults to max health', () => {
      expect(new Unit('Foo', 'f', 20).reward).toBe(20);
    });
  });

  test('has a hostile status which defaults to true', () => {
    expect(unit.hostile).toBe(true);
  });

  test('has a bound status which defaults to false', () => {
    expect(unit.bound).toBe(false);
  });

  test('has a collection of abilities which starts empty', () => {
    expect(unit.abilities).toBeInstanceOf(Map);
    expect(unit.abilities.size).toBe(0);
  });

  test('has a collection of effects which starts empty', () => {
    expect(unit.effects).toBeInstanceOf(Map);
    expect(unit.effects.size).toBe(0);
  });

  test('has a health which defaults to max health', () => {
    expect(unit.health).toBe(20);
  });

  test('starts with a score of zero', () => {
    expect(unit.score).toBe(0);
  });

  test('has a turn which starts null', () => {
    expect(unit.turn).toBeNull();
  });

  test('allows to add abilities', () => {
    expect(unit.abilities.has('walk')).toBe(false);
    unit.addAbility('walk', {});
    expect(unit.abilities.has('walk')).toBe(true);
  });

  test('allows to add effects', () => {
    expect(unit.effects.has('ticking')).toBe(false);
    unit.addEffect('ticking', {});
    expect(unit.effects.has('ticking')).toBe(true);
  });

  test('considers itself under an effect when it has such effect', () => {
    unit.addEffect('ticking', {});
    expect(unit.isUnderEffect('ticking')).toBe(true);
  });

  test('can trigger a given effect when it has such effect', () => {
    const ticking = { trigger: jest.fn() };
    unit.addEffect('ticking', ticking);
    const itching = { trigger: jest.fn() };
    unit.triggerEffect('ticking');
    unit.triggerEffect('itching');
    expect(ticking.trigger).toHaveBeenCalled();
    expect(itching.trigger).not.toHaveBeenCalled();
  });

  test('knows if it is friendly', () => {
    expect(unit.isFriendly()).toBe(false);
    unit.hostile = false;
    expect(unit.isFriendly()).toBe(true);
  });

  test('prepares turn by calling playTurn with next turn object', () => {
    unit.getNextTurn = () => 'nextTurn';
    unit.playTurn = jest.fn();
    unit.prepareTurn();
    expect(unit.playTurn).toHaveBeenCalledWith('nextTurn');
  });

  test('calls passTurn once on effects when calling perform on turn', () => {
    const ticking = { passTurn: jest.fn() };
    unit.addEffect('ticking', ticking);
    unit.turn = { action: null };
    unit.performTurn();
    expect(ticking.passTurn).toHaveBeenCalledTimes(1);
  });

  test('performs action when calling perform on turn', () => {
    const walk = { perform: jest.fn() };
    unit.addAbility('walk', walk);
    unit.turn = { action: ['walk', ['backward']] };
    unit.performTurn();
    expect(walk.perform).toHaveBeenCalledWith('backward');
  });

  test("doesn't throw when calling performTurn when there is no action", () => {
    unit.turn = { action: null };
    unit.performTurn();
  });

  describe('when healing', () => {
    test('adds health', () => {
      unit.health = 5;
      unit.heal(3);
      expect(unit.health).toBe(8);
      expect(unit.say).toHaveBeenCalledWith(
        'receives 3 health, up to 8 health',
      );
    });

    test("doesn't go over max health", () => {
      unit.health = 19;
      unit.heal(2);
      expect(unit.health).toBe(20);
      expect(unit.say).toHaveBeenCalledWith(
        'receives 2 health, up to 20 health',
      );
    });

    test("doesn't add health when at max", () => {
      unit.heal(1);
      expect(unit.health).toBe(20);
      expect(unit.say).toHaveBeenCalledWith(
        'receives 1 health, up to 20 health',
      );
    });
  });

  describe('when taking damage', () => {
    test('subtracts health', () => {
      unit.takeDamage(3);
      expect(unit.health).toBe(17);
      expect(unit.say).toHaveBeenCalledWith(
        'takes 3 damage, 17 health power left',
      );
    });

    test("doesn't go under zero health", () => {
      unit.takeDamage(21);
      expect(unit.health).toBe(0);
      expect(unit.say).toHaveBeenCalledWith(
        'takes 21 damage, 0 health power left',
      );
    });

    test('dies when running out of health', () => {
      unit.takeDamage(20);
      expect(unit.isAlive()).toBe(false);
      expect(unit.say).toHaveBeenCalledWith(
        'takes 20 damage, 0 health power left',
      );
      expect(unit.say).toHaveBeenCalledWith('dies');
    });
  });

  describe('when dead', () => {
    beforeEach(() => {
      unit.position = null;
    });

    test("doesn't perform any action", () => {
      const walk = { perform: jest.fn() };
      unit.addAbility('walk', walk);
      unit.turn = { action: ['walk', []] };
      unit.performTurn();
      expect(walk.perform).not.toHaveBeenCalled();
    });
  });

  test('can damage another unit', () => {
    const receiver = new Unit();
    receiver.health = 10;
    receiver.position = {};
    receiver.say = jest.fn();
    unit.damage(receiver, 3);
    expect(receiver.health).toBe(7);
  });

  describe('when dealing damage', () => {
    let receiver;

    beforeEach(() => {
      receiver = new Unit();
      receiver.maxHealth = 5;
      receiver.reward = 10;
      receiver.health = 5;
      receiver.position = {};
      receiver.say = jest.fn();
    });

    test('earns points equal to reward when killing unit', () => {
      unit.earnPoints = jest.fn();
      unit.damage(receiver, 5);
      expect(unit.earnPoints).toHaveBeenCalledWith(10);
    });

    test("doesn't earn points when not killing unit", () => {
      unit.earnPoints = jest.fn();
      unit.damage(receiver, 3);
      expect(unit.earnPoints).not.toHaveBeenCalled();
    });

    test('lose points equal to reward when killing a friendly unit', () => {
      receiver.hostile = false;
      unit.losePoints = jest.fn();
      unit.damage(receiver, 5);
      expect(unit.losePoints).toHaveBeenCalledWith(10);
    });
  });

  test('considers itself alive with position', () => {
    expect(unit.isAlive()).toBe(true);
  });

  test('considers itself dead when no position', () => {
    unit.position = null;
    expect(unit.isAlive()).toBe(false);
  });

  test('is bound after calling bind', () => {
    unit.bind();
    expect(unit.isBound()).toBe(true);
  });

  describe('when bound', () => {
    beforeEach(() => {
      unit.bind();
    });

    test("doesn't perform any action", () => {
      const walk = { perform: jest.fn() };
      unit.addAbility('walk', walk);
      unit.turn = { action: ['walk', []] };
      unit.performTurn();
      expect(walk.perform).not.toHaveBeenCalled();
    });

    test('is released from bonds when calling unbind', () => {
      unit.unbind();
      expect(unit.isBound()).toBe(false);
    });

    test('is released from bonds when taking damage', () => {
      unit.takeDamage(2);
      expect(unit.isBound()).toBe(false);
    });
  });

  test('can earn points', () => {
    unit.earnPoints(5);
    expect(unit.score).toBe(5);
  });

  test('can lose points', () => {
    unit.score = 10;
    unit.losePoints(5);
    expect(unit.score).toBe(5);
  });

  test('can lose points under zero', () => {
    unit.score = 3;
    unit.losePoints(5);
    expect(unit.score).toBe(-2);
  });

  test("doesn't fetch itself when fetching other units", () => {
    const anotherUnit = new Unit();
    floor.addUnit(anotherUnit, { x: 3, y: 4, facing: NORTH });
    expect(unit.getOtherUnits()).not.toContain(unit);
    expect(unit.getOtherUnits()).toContain(anotherUnit);
  });

  test("returns the space where it's located", () => {
    const space = unit.getSpace();
    expect(space.location).toEqual(unit.position.location);
  });

  test('returns space at a given direction and number of spaces', () => {
    unit.position = { getRelativeSpace: jest.fn() };
    unit.getSpaceAt(RIGHT, 2, 1);
    expect(unit.position.getRelativeSpace).toHaveBeenCalledWith(RIGHT, [2, 1]);
  });

  test('returns immediate space at a given direction if number of spaces is omitted', () => {
    unit.position = { getRelativeSpace: jest.fn() };
    unit.getSpaceAt(LEFT);
    expect(unit.position.getRelativeSpace).toHaveBeenCalledWith(LEFT, [1, 0]);
  });

  test('returns the direction of the stairs', () => {
    expect(unit.getDirectionOfStairs()).toEqual(FORWARD);
  });

  test('returns the direction of a given space', () => {
    expect(unit.getDirectionOf(floor.getSpaceAt([1, 1]))).toEqual(FORWARD);
    expect(unit.getDirectionOf(floor.getSpaceAt([2, 2]))).toEqual(RIGHT);
    expect(unit.getDirectionOf(floor.getSpaceAt([1, 3]))).toEqual(BACKWARD);
    expect(unit.getDirectionOf(floor.getSpaceAt([0, 2]))).toEqual(LEFT);
  });

  test('returns the distance of a given space', () => {
    expect(unit.getDistanceOf(floor.getSpaceAt([0, 0]))).toBe(3);
  });

  describe('when moving', () => {
    beforeEach(() => {
      unit.position = { move: jest.fn() };
    });

    test('moves in the given direction by a given number of spaces', () => {
      unit.move(RIGHT, 2, 1);
      expect(unit.position.move).toHaveBeenCalledWith(RIGHT, [2, 1]);
    });

    test('moves one space in the given direction if number of spaces is omitted', () => {
      unit.move(LEFT);
      expect(unit.position.move).toHaveBeenCalledWith(LEFT, [1, 0]);
    });

    test('murmurs something', () => {
      unit.move(FORWARD);
      expect(unit.say).toHaveBeenCalled();
    });
  });

  describe('when rotating', () => {
    beforeEach(() => {
      unit.position = { rotate: jest.fn() };
    });

    test('rotates in the given direction', () => {
      unit.rotate(RIGHT);
      expect(unit.position.rotate).toHaveBeenCalledWith(RIGHT);
    });

    test('murmurs something', () => {
      unit.rotate(BACKWARD);
      expect(unit.say).toHaveBeenCalled();
    });
  });

  describe('when vanishing', () => {
    test('disappears from the floor', () => {
      expect(unit.position).not.toBeNull();
      unit.vanish();
      expect(unit.position).toBeNull();
    });

    test('murmurs something', () => {
      unit.vanish();
      expect(unit.say).toHaveBeenCalled();
    });
  });

  test('has a nice string representation', () => {
    expect(unit.toString()).toBe(unit.name);
  });
});
