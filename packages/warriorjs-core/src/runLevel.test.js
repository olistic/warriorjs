import {
  BACKWARD,
  EAST,
  FORWARD,
  RELATIVE_DIRECTIONS,
  WEST,
} from '@warriorjs/geography';

import runLevel from './runLevel';

const levelConfig = {
  timeBonus: 20,
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
        walk: unit => ({
          action: true,
          perform(direction = FORWARD) {
            unit.log(`walks ${direction}`);
            const space = unit.getSpaceAt(direction);
            if (space.isEmpty()) {
              unit.move(direction);
            } else {
              unit.log(`bumps into ${space}`);
            }
          },
        }),
        attack: unit => ({
          action: true,
          perform(direction = FORWARD) {
            const receiver = unit.getSpaceAt(direction).getUnit();
            if (receiver) {
              unit.log(`attacks ${direction} and hits ${receiver}`);
              const attackingBackward = direction === BACKWARD;
              const amount = attackingBackward ? 3 : 5;
              unit.damage(receiver, amount);
            } else {
              unit.log(`attacks ${direction} and hits nothing`);
            }
          },
        }),
        feel: unit => ({
          perform(direction = FORWARD) {
            return unit.getSensedSpaceAt(direction);
          },
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
          attack: unit => ({
            action: true,
            perform(direction = FORWARD) {
              const receiver = unit.getSpaceAt(direction).getUnit();
              if (receiver) {
                unit.log(`attacks ${direction} and hits ${receiver}`);
                const attackingBackward = direction === BACKWARD;
                const amount = attackingBackward ? 2 : 3;
                unit.damage(receiver, amount);
              } else {
                unit.log(`attacks ${direction} and hits nothing`);
              }
            },
          }),
          feel: unit => ({
            perform(direction = FORWARD) {
              return unit.getSensedSpaceAt(direction);
            },
          }),
        },
        playTurn(sludge) {
          const threatDirection = RELATIVE_DIRECTIONS.find(direction => {
            const unit = sludge.feel(direction).getUnit();
            return unit && unit.isEnemy() && !unit.isBound();
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
  const { passed, score } = runLevel(levelConfig, playerCode);
  expect(passed).toBe(true);
  expect(score).toEqual({
    clearBonus: 4,
    timeBonus: 10,
    warriorScore: 12,
  });
});

test('fails level with a loser player code', () => {
  const playerCode = `
    class Player {
      playTurn(warrior) {}
    }
  `;
  const { passed, score } = runLevel(levelConfig, playerCode);
  expect(passed).toBe(false);
  expect(score).toBeUndefined();
});
