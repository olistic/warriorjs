import { BACKWARD, FORWARD, type RelativeDirection } from '@warriorjs/spatial';

import type { Unit } from './types.js';

const defaultDirection = FORWARD;

function attack({ power }: { power: number }) {
  return (unit: Unit) => ({
    action: true as const,
    description: `Attacks a unit in the given direction (\`'${defaultDirection}'\` by default), dealing ${power} HP of damage.`,
    perform(direction: RelativeDirection = defaultDirection) {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver) {
        unit.log(`attacks ${direction} and hits ${receiver}`);
        const attackingBackward = direction === BACKWARD;
        const amount = attackingBackward ? Math.ceil(power / 2.0) : power;
        unit.damage(receiver, amount);
      } else {
        unit.log(`attacks ${direction} and hits nothing`);
      }
    },
    meta: {
      params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
      returns: 'void' as const,
    },
  });
}

export default attack;
