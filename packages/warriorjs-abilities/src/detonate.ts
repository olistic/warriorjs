import { FORWARD, type RelativeDirection } from '@warriorjs/geography';

import type { Space, Unit } from './types.js';

const defaultDirection = FORWARD;
const surroundingOffsets: [number, number][] = [
  [1, 1],
  [1, -1],
  [2, 0],
  [0, 0],
];

function detonate({
  targetPower,
  surroundingPower,
}: {
  targetPower: number;
  surroundingPower: number;
}) {
  return (unit: Unit) => ({
    action: true as const,
    description: `Detonates a bomb in a given direction (\`'${defaultDirection}'\` by default), dealing ${targetPower} HP of damage to that space and ${surroundingPower} HP of damage to surrounding 4 spaces (including yourself).`,
    perform(direction: RelativeDirection = defaultDirection) {
      unit.log(`detonates a bomb ${direction} launching a deadly explosion`);
      const targetSpace = unit.getSpaceAt(direction);
      this.bomb(targetSpace, targetPower);
      surroundingOffsets
        .map(([forward, right]) => unit.getSpaceAt(direction, forward, right))
        .forEach((surroundingSpace) => {
          this.bomb(surroundingSpace, surroundingPower);
        });
    },
    bomb(space: Space, power: number) {
      const receiver = space.getUnit();
      if (receiver) {
        unit.damage(receiver, power);
        if (receiver.isUnderEffect('ticking')) {
          receiver.log('caught in the blast, detonating the ticking explosive');
          receiver.triggerEffect('ticking');
        }
      }
    },
    meta: {
      params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
      returns: 'void' as const,
    },
  });
}

export default detonate;
