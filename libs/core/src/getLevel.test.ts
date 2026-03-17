import { EAST, RELATIVE_DIRECTIONS, WEST } from '@warriorjs/spatial';
import { expect, test } from 'vitest';

import type { AbilityMeta } from './Ability.js';
import Action from './Action.js';
import getLevel from './getLevel.js';
import Sense from './Sense.js';
import Unit from './Unit.js';

class TestWalk extends Action {
  readonly description = "Moves one space in the given direction (`'forward'` by default).";
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'void',
  };
  perform() {}
}

class TestAttack extends Action {
  readonly description: string;
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'void',
  };
  constructor(unit: any, { power }: { power: number }) {
    super(unit);
    this.description = `Attacks a unit in the given direction (\`'forward'\` by default), dealing ${power} HP of damage.`;
  }
  perform() {}
  static with(config: { power: number }) {
    return [TestAttack, config] as [new (unit: any, config: any) => TestAttack, object];
  }
}

class TestFeel extends Sense {
  readonly description =
    "Returns the adjacent space in the given direction (`'forward'` by default).";
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'Space',
  };
  perform() {}
}

class TestSludge extends Unit {
  static declaredAbilities = {
    attack: TestAttack.with({ power: 3 }),
    feel: TestFeel,
  };

  constructor() {
    super('Sludge', 's', '#d08770', 12);
    this.playTurn = (turn: any) => {
      const playerDirection = RELATIVE_DIRECTIONS.find((direction) => {
        const space = turn.feel(direction);
        return space.isUnit() && space.getUnit().isPlayer();
      });
      if (playerDirection) {
        turn.attack(playerDirection);
      }
    };
  }
}

const levelConfig = {
  number: 2,
  description: "It's too dark to see anything, but you smell sludge nearby.",
  tip: "Use `warrior.feel().isEmpty()` to see if there's anything in front of you, and `warrior.attack()` to fight it. Remember, you can only do one action per turn.",
  clue: 'Add an if/else condition using `warrior.feel().isEmpty()` to decide whether to attack or walk.',
  floor: {
    size: { width: 8, height: 1 },
    stairs: { x: 7, y: 0 },
    warrior: {
      name: 'Joe',
      character: '@',
      color: '#8fbcbb',
      maxHealth: 20,
      abilities: {
        walk: TestWalk,
        attack: TestAttack.with({ power: 5 }),
        feel: TestFeel,
      },
      position: { x: 0, y: 0, facing: EAST },
    },
    units: [
      {
        unit: TestSludge,
        position: { x: 4, y: 0, facing: WEST },
      },
    ],
  },
};

test('returns level', () => {
  expect(getLevel(levelConfig)).toEqual({
    number: 2,
    description: "It's too dark to see anything, but you smell sludge nearby.",
    tip: "Use `warrior.feel().isEmpty()` to see if there's anything in front of you, and `warrior.attack()` to fight it. Remember, you can only do one action per turn.",
    clue: 'Add an if/else condition using `warrior.feel().isEmpty()` to decide whether to attack or walk.',
    floorMap: [
      [
        { character: '\u2554' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2557' },
      ],
      [
        { character: '\u2551' },
        {
          character: '@',
          unit: { name: 'Joe', color: '#8fbcbb', maxHealth: 20 },
        },
        { character: ' ' },
        { character: ' ' },
        { character: ' ' },
        {
          character: 's',
          unit: { name: 'Sludge', color: '#d08770', maxHealth: 12 },
        },
        { character: ' ' },
        { character: ' ' },
        { character: '>' },
        { character: '\u2551' },
      ],
      [
        { character: '\u255a' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u2550' },
        { character: '\u255d' },
      ],
    ],
    warriorStatus: { health: 20, score: 0 },
    warriorAbilities: {
      actions: [
        {
          name: 'attack',
          description:
            "Attacks a unit in the given direction (`'forward'` by default), dealing 5 HP of damage.",
        },
        {
          name: 'walk',
          description: "Moves one space in the given direction (`'forward'` by default).",
        },
      ],
      senses: [
        {
          name: 'feel',
          description:
            "Returns the adjacent space in the given direction (`'forward'` by default).",
        },
      ],
    },
  });
});
