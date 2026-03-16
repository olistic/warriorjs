import { attack, feel, walk } from '@warriorjs/abilities';
import { EAST, RELATIVE_DIRECTIONS, WEST } from '@warriorjs/spatial';
import { expect, test } from 'vitest';

import runLevel from './runLevel.js';

const levelConfig = {
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
        walk: walk,
        attack: attack.with({ power: 5 }),
        feel: feel,
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
          attack: attack.with({ power: 3 }),
          feel: feel,
        },
        playTurn(sludge: any) {
          const threatDirection = RELATIVE_DIRECTIONS.find((direction) => {
            const unit = sludge.feel(direction).getUnit();
            return unit?.isEnemy() && !unit.isBound();
          });
          if (threatDirection) {
            sludge.attack(threatDirection);
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

test('passes level with a winner player code', () => {
  const playerCode = `
    class Player {
      playTurn(warrior) {
        const spaceAhead = warrior.feel();
        if (spaceAhead.isUnit() && spaceAhead.getUnit().isEnemy()) {
          warrior.attack();
        } else {
          warrior.walk();
        }
      }
    }
  `;
  const { passed } = runLevel(levelConfig, playerCode);
  expect(passed).toBe(true);
});

test('fails level with a loser player code', () => {
  const playerCode = `
    class Player {
      playTurn(warrior) {}
    }
  `;
  const { passed } = runLevel(levelConfig, playerCode);
  expect(passed).toBe(false);
});
