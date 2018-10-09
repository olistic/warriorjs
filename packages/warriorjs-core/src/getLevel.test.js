import { EAST, FORWARD, RELATIVE_DIRECTIONS, WEST } from '@warriorjs/geography';

import getLevel from './getLevel';

const levelConfig = {
  number: 2,
  description: "It's too dark to see anything, but you smell sludge nearby.",
  tip:
    "Use `warrior.feel().isEmpty()` to see if there's anything in front of you, and `warrior.attack()` to fight it. Remember, you can only do one action per turn.",
  clue:
    'Add an if/else condition using `warrior.feel().isEmpty()` to decide whether to attack or walk.',
  floor: {
    size: {
      width: 8,
      height: 1,
    },
    stairs: {
      x: 7,
      y: 0,
    },
    warrior: {
      name: 'Joe',
      character: '@',
      color: '#8fbcbb',
      maxHealth: 20,
      abilities: {
        walk: () => ({
          action: true,
          description: `Moves one space in the given direction (\`'${FORWARD}'\` by default).`,
        }),
        attack: () => ({
          action: true,
          description: `Attacks a unit in the given direction (\`'${FORWARD}'\` by default), dealing 5 HP of damage.`,
        }),
        feel: () => ({
          description: `Returns the adjacent space in the given direction (\`'${FORWARD}'\` by default).`,
        }),
      },
      position: {
        x: 0,
        y: 0,
        facing: EAST,
      },
    },
    units: [
      {
        name: 'Sludge',
        character: 's',
        color: '#d08770',
        maxHealth: 12,
        abilities: {
          attack: () => ({
            action: true,
            description: `Attacks a unit in the given direction (\`'${FORWARD}'\` by default), dealing 3 HP of damage.`,
          }),
          feel: () => ({
            description: `Returns the adjacent space in the given direction (\`'${FORWARD}'\` by default).`,
          }),
        },
        playTurn(sludge) {
          const playerDirection = RELATIVE_DIRECTIONS.find(direction => {
            const space = sludge.feel(direction);
            return space.isUnit() && space.getUnit().isPlayer();
          });
          if (playerDirection) {
            sludge.attack(playerDirection);
          }
        },
        position: {
          x: 4,
          y: 0,
          facing: WEST,
        },
      },
    ],
  },
};

test('returns level', () => {
  expect(getLevel(levelConfig)).toEqual({
    number: 2,
    description: "It's too dark to see anything, but you smell sludge nearby.",
    tip:
      "Use `warrior.feel().isEmpty()` to see if there's anything in front of you, and `warrior.attack()` to fight it. Remember, you can only do one action per turn.",
    clue:
      'Add an if/else condition using `warrior.feel().isEmpty()` to decide whether to attack or walk.',
    floorMap: [
      [
        { character: '╔' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '╗' },
      ],
      [
        { character: '║' },
        {
          character: '@',
          unit: {
            name: 'Joe',
            color: '#8fbcbb',
            maxHealth: 20,
          },
        },
        { character: ' ' },
        { character: ' ' },
        { character: ' ' },
        {
          character: 's',
          unit: {
            name: 'Sludge',
            color: '#d08770',
            maxHealth: 12,
          },
        },
        { character: ' ' },
        { character: ' ' },
        { character: '>' },
        { character: '║' },
      ],
      [
        { character: '╚' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '═' },
        { character: '╝' },
      ],
    ],
    warriorStatus: {
      health: 20,
      score: 0,
    },
    warriorAbilities: {
      actions: [
        {
          name: 'attack',
          description:
            "Attacks a unit in the given direction (`'forward'` by default), dealing 5 HP of damage.",
        },
        {
          name: 'walk',
          description:
            "Moves one space in the given direction (`'forward'` by default).",
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
