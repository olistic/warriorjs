import { EAST, FORWARD, RELATIVE_DIRECTIONS, WEST } from '@warriorjs/geography';

import getLevel from './getLevel';

const levelConfig = {
  towerName: 'beginner',
  number: 2,
  description: "It's too dark to see anything, but you smell sludge nearby.",
  tip:
    "Use `warrior.feel().isEmpty()` to see if there's anything in front of you, and `warrior.attack()` to fight it. Remember, you can only do one action per turn.",
  clue:
    'Add an if/else condition using `warrior.feel().isEmpty()` to decide whether to attack or walk.',
  timeBonus: 20,
  aceScore: 26,
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
      maxHealth: 20,
      abilities: {
        walk: () => ({
          action: true,
          description: `Move one space in the given direction (${FORWARD} by default).`,
        }),
        attack: () => ({
          action: true,
          description: `Attack a unit in the given direction (${FORWARD} by default) dealing 5 HP of damage.`,
        }),
        feel: () => ({
          description: `Return the adjacent space in the given direction (${FORWARD} by default).`,
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
        maxHealth: 12,
        abilities: {
          attack: () => ({
            action: true,
            description: `Attack a unit in the given direction (${FORWARD} by default) dealing 3 HP of damage.`,
          }),
          feel: () => ({
            description: `Return the adjacent space in the given direction (${FORWARD} by default).`,
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
    towerName: 'beginner',
    number: 2,
    description: "It's too dark to see anything, but you smell sludge nearby.",
    tip:
      "Use `warrior.feel().isEmpty()` to see if there's anything in front of you, and `warrior.attack()` to fight it. Remember, you can only do one action per turn.",
    clue:
      'Add an if/else condition using `warrior.feel().isEmpty()` to decide whether to attack or walk.',
    timeBonus: 20,
    floor: {
      map: [
        [
          {
            character: '╔',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '╗',
            stairs: false,
          },
        ],
        [
          {
            character: '║',
            stairs: false,
          },
          {
            character: '@',
            stairs: false,
            unit: {
              name: 'Joe',
              character: '@',
              maxHealth: 20,
              warrior: true,
              health: 20,
              score: 0,
              abilities: {
                actions: [
                  [
                    'walk',
                    'Move one space in the given direction (forward by default).',
                  ],
                  [
                    'attack',
                    'Attack a unit in the given direction (forward by default) dealing 5 HP of damage.',
                  ],
                ],
                senses: [
                  [
                    'feel',
                    'Return the adjacent space in the given direction (forward by default).',
                  ],
                ],
              },
            },
          },
          {
            character: ' ',
            stairs: false,
          },
          {
            character: ' ',
            stairs: false,
          },
          {
            character: ' ',
            stairs: false,
          },
          {
            character: 's',
            stairs: false,
            unit: {
              name: 'Sludge',
              character: 's',
              maxHealth: 12,
              health: 12,
            },
          },
          {
            character: ' ',
            stairs: false,
          },
          {
            character: ' ',
            stairs: false,
          },
          {
            character: '>',
            stairs: true,
          },
          {
            character: '║',
            stairs: false,
          },
        ],
        [
          {
            character: '╚',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '╝',
            stairs: false,
          },
        ],
      ],
      warrior: {
        name: 'Joe',
        character: '@',
        maxHealth: 20,
        warrior: true,
        abilities: {
          actions: [
            [
              'walk',
              'Move one space in the given direction (forward by default).',
            ],
            [
              'attack',
              'Attack a unit in the given direction (forward by default) dealing 5 HP of damage.',
            ],
          ],
          senses: [
            [
              'feel',
              'Return the adjacent space in the given direction (forward by default).',
            ],
          ],
        },
        health: 20,
        score: 0,
      },
    },
  });
});
