import {
  BACKWARD,
  FORWARD,
  LEFT,
  NORTH,
  RIGHT,
  SOUTH,
} from '@warriorjs/geography';

import Floor from './Floor';
import Unit from './Unit';

describe('Unit', () => {
  let unit;
  let floor;

  beforeEach(() => {
    unit = new Unit('Joe', '@', 20, 30);
    unit.log = jest.fn();
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

  test('has an enemy status which defaults to true', () => {
    expect(unit.enemy).toBe(true);
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

  describe('next turn', () => {
    let turn;
    let feel;
    let walk;

    beforeEach(() => {
      feel = { perform: jest.fn() };
      walk = {
        action: true,
        perform: jest.fn(),
      };
      unit.addAbility('feel', feel);
      unit.addAbility('walk', walk);
      turn = unit.getNextTurn();
    });

    test('defines a function for each ability of the unit', () => {
      expect(turn.feel).toBeInstanceOf(Function);
      expect(turn.walk).toBeInstanceOf(Function);
    });

    describe('with actions', () => {
      test('has no action performed at first', () => {
        expect(turn.action).toBeNull();
      });

      test('can call action and recall it', () => {
        turn.walk();
        expect(turn.action).toEqual(['walk', []]);
      });

      test('includes arguments passed to action', () => {
        turn.walk('forward');
        expect(turn.action).toEqual(['walk', ['forward']]);
      });

      test("can't call multiple actions per turn", () => {
        turn.walk();
        expect(() => {
          turn.walk();
        }).toThrow('Only one action can be performed per turn.');
      });

      test('defers execution when calling action', () => {
        turn.walk();
        expect(walk.perform).not.toHaveBeenCalled();
      });
    });

    describe('with senses', () => {
      test('can call multiple senses per turn', () => {
        turn.feel();
        turn.feel();
      });

      test('executes immediately when calling sense', () => {
        turn.feel();
        expect(feel.perform).toHaveBeenCalled();
      });
    });
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
      expect(unit.log).toHaveBeenCalledWith(
        'receives 3 health, up to 8 health',
      );
    });

    test("doesn't go over max health", () => {
      unit.health = 19;
      unit.heal(2);
      expect(unit.health).toBe(20);
      expect(unit.log).toHaveBeenCalledWith(
        'receives 2 health, up to 20 health',
      );
    });

    test("doesn't add health when at max", () => {
      unit.heal(1);
      expect(unit.health).toBe(20);
      expect(unit.log).toHaveBeenCalledWith(
        'receives 1 health, up to 20 health',
      );
    });
  });

  describe('when taking damage', () => {
    test('subtracts health', () => {
      unit.takeDamage(3);
      expect(unit.health).toBe(17);
      expect(unit.log).toHaveBeenCalledWith(
        'takes 3 damage, 17 health power left',
      );
    });

    test("doesn't go under zero health", () => {
      unit.takeDamage(21);
      expect(unit.health).toBe(0);
      expect(unit.log).toHaveBeenCalledWith(
        'takes 21 damage, 0 health power left',
      );
    });

    test('dies when running out of health', () => {
      unit.takeDamage(20);
      expect(unit.isAlive()).toBe(false);
      expect(unit.log).toHaveBeenCalledWith(
        'takes 20 damage, 0 health power left',
      );
      expect(unit.log).toHaveBeenCalledWith('dies');
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
    receiver.log = jest.fn();
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
      receiver.as = () => ({ isEnemy: () => true });
      receiver.log = jest.fn();
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

    test('lose points equal to reward when killing a friend', () => {
      receiver.as = () => ({ isEnemy: () => false });
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

  describe('when releasing', () => {
    let receiver;

    beforeEach(() => {
      receiver = new Unit();
      receiver.reward = 10;
      receiver.bound = true;
      receiver.position = {};
      receiver.as = () => ({ isEnemy: () => true });
      receiver.log = jest.fn();
    });

    test('unbinds the unit', () => {
      receiver.unbind = jest.fn();
      unit.release(receiver);
      expect(receiver.unbind).toHaveBeenCalled();
    });

    test("doesn't earn points", () => {
      unit.earnPoints = jest.fn();
      unit.release(receiver);
      expect(unit.earnPoints).not.toHaveBeenCalled();
    });

    describe('friendly unit', () => {
      beforeEach(() => {
        receiver.as = () => ({ isEnemy: () => false });
      });

      test('vanishes the unit', () => {
        receiver.vanish = jest.fn();
        unit.release(receiver);
        expect(receiver.vanish).toHaveBeenCalled();
      });

      test('earns points equal to reward', () => {
        unit.earnPoints = jest.fn();
        unit.release(receiver);
        expect(unit.earnPoints).toHaveBeenCalledWith(10);
      });
    });
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

  test('returns sensed space at a given direction and number of spaces', () => {
    const space = { as: jest.fn() };
    unit.getSpaceAt = jest.fn(() => space);
    unit.getSensedSpaceAt(RIGHT, 2, 1);
    expect(unit.getSpaceAt).toHaveBeenCalledWith(RIGHT, 2, 1);
    expect(space.as).toHaveBeenCalledWith(unit);
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
    expect(unit.getDirectionOf(unit.getSensedSpaceAt(FORWARD, 1))).toEqual(
      FORWARD,
    );
    expect(unit.getDirectionOf(unit.getSensedSpaceAt(RIGHT, 1))).toEqual(RIGHT);
    expect(unit.getDirectionOf(unit.getSensedSpaceAt(BACKWARD, 1))).toEqual(
      BACKWARD,
    );
    expect(unit.getDirectionOf(unit.getSensedSpaceAt(LEFT, 1))).toEqual(LEFT);
  });

  test('returns the distance of a given space', () => {
    expect(unit.getDistanceOf(unit.getSensedSpaceAt(FORWARD, 2, -1))).toBe(3);
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
      expect(unit.log).toHaveBeenCalled();
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
      expect(unit.log).toHaveBeenCalled();
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
      expect(unit.log).toHaveBeenCalled();
    });
  });

  describe('sensed unit', () => {
    let sensingUnit;
    let sensedUnit;

    beforeEach(() => {
      sensingUnit = new Unit();
      sensingUnit.enemy = false;
      floor.addUnit(sensingUnit, { x: 0, y: 1, facing: SOUTH });
      sensedUnit = unit.as(sensingUnit);
    });

    test('allows calling sensed unit methods', () => {
      const allowedApi = ['isBound', 'isEnemy', 'isUnderEffect'];
      allowedApi.forEach(propertyName => {
        sensedUnit[propertyName]();
      });
    });

    test("is considered enemy if it doesn't fight for the same side", () => {
      expect(sensedUnit.isEnemy()).toBe(true);
    });

    test("doesn't allow calling other unit methods", () => {
      const forbiddenApi = [
        'addAbility',
        'addEffect',
        'as',
        'bind',
        'damage',
        'earnPoints',
        'getDirectionOf',
        'getDirectionOfStairs',
        'getDistanceOf',
        'getNextTurn',
        'getOtherUnits',
        'getSpace',
        'getSpaceAt',
        'heal',
        'isAlive',
        'log',
        'losePoints',
        'move',
        'performTurn',
        'prepareTurn',
        'rotate',
        'takeDamage',
        'triggerEffect',
        'unbind',
        'vanish',
      ];
      forbiddenApi.forEach(propertyName => {
        expect(sensedUnit).not.toHaveProperty(propertyName);
      });
    });
  });

  test('has a nice string representation', () => {
    expect(unit.toString()).toBe(unit.name);
  });
});
