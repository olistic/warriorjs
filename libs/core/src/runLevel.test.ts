import { BACKWARD, EAST, FORWARD, RELATIVE_DIRECTIONS, WEST } from '@warriorjs/spatial';
import { expect, test } from 'vitest';

import type { AbilityMeta } from './Ability.js';
import Action from './Action.js';
import runLevel from './runLevel.js';
import Sense from './Sense.js';
import Unit from './Unit.js';

class TestWalk extends Action {
  readonly description = 'Walks forward';
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'void',
  };
  perform(direction = FORWARD) {
    const space = this.unit.getSpaceAt(direction);
    if (space.isEmpty()) {
      this.unit.move(direction);
      this.unit.log(`walks ${direction}`);
    } else {
      this.unit.log(`walks ${direction} and bumps into ${space}`);
    }
  }
}

class TestAttack extends Action {
  readonly description: string;
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'void',
  };
  private power: number;
  constructor(unit: any, { power }: { power: number }) {
    super(unit);
    this.description = `Attacks dealing ${power} HP`;
    this.power = power;
  }
  perform(direction = FORWARD) {
    const receiver = this.unit.getSpaceAt(direction).getUnit();
    if (receiver) {
      this.unit.log(`attacks ${direction} and hits ${receiver}`);
      const amount = direction === BACKWARD ? Math.ceil(this.power / 2.0) : this.power;
      this.unit.damage(receiver, amount);
    } else {
      this.unit.log(`attacks ${direction} and hits nothing`);
    }
  }
  static with(config: { power: number }) {
    return [TestAttack, config] as [new (unit: any, config: any) => TestAttack, object];
  }
}

class TestFeel extends Sense {
  readonly description = 'Feels ahead';
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'Space',
  };
  perform(direction = FORWARD) {
    return this.unit.getSensedSpaceAt(direction);
  }
}

class TestSludge extends Unit {
  static declaredAbilities = {
    attack: TestAttack.with({ power: 3 }),
    feel: TestFeel,
  };

  constructor() {
    super('Sludge', 's', '#d08770', 12);
    this.playTurn = (turn: any) => {
      const threatDirection = RELATIVE_DIRECTIONS.find((direction) => {
        const unit = turn.feel(direction).getUnit();
        return unit?.isEnemy() && !unit.isBound();
      });
      if (threatDirection) {
        turn.attack(threatDirection);
      }
    };
  }
}

const levelConfig = {
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
