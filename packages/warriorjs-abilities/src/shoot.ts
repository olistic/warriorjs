import { FORWARD, type RelativeDirection } from '@warriorjs/geography';

import type { Unit } from './types.js';

const defaultDirection = FORWARD;

function shoot({ power, range }: { power: number; range: number }) {
  return (unit: Unit) => ({
    action: true as const,
    description: `Shoots the bow & arrow in the given direction (\`'${defaultDirection}'\` by default), dealing ${power} HP of damage to the first unit in a range of ${range} spaces.`,
    perform(direction: RelativeDirection = defaultDirection) {
      const offsets = Array.from(new Array(range), (_, index) => index + 1);
      const receiver = offsets
        .map((offset) => unit.getSpaceAt(direction, offset).getUnit())
        .find((unitInRange) => unitInRange);
      if (receiver) {
        unit.log(`shoots ${direction} and hits ${receiver}`);
        unit.damage(receiver, power);
      } else {
        unit.log(`shoots ${direction} and hits nothing`);
      }
    },
    meta: {
      params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
      returns: 'void' as const,
    },
  });
}

export default shoot;
