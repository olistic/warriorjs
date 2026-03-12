import { FORWARD, type RelativeDirection } from '@warriorjs/spatial';

import type { Unit } from './types.js';

const defaultDirection = FORWARD;

function rescue() {
  return (unit: Unit) => ({
    action: true as const,
    description: `Releases a unit from their chains in the given direction (\`'${defaultDirection}'\` by default).`,
    perform(direction: RelativeDirection = defaultDirection) {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver?.isBound()) {
        unit.log(`unbinds ${direction} and rescues ${receiver}`);
        unit.release(receiver);
      } else {
        unit.log(`unbinds ${direction} and rescues nothing`);
      }
    },
    meta: {
      params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
      returns: 'void' as const,
    },
  });
}

export default rescue;
