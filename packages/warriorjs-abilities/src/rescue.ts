import { FORWARD, type RelativeDirection } from '@warriorjs/geography';

import type { Unit } from './types.js';

const defaultDirection = FORWARD;

function rescue() {
  return (unit: Unit) => ({
    action: true as const,
    description: `Releases a unit from his chains in the given direction (\`'${defaultDirection}'\` by default).`,
    perform(direction: RelativeDirection = defaultDirection) {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver && receiver.isBound()) {
        unit.log(`unbinds ${direction} and rescues ${receiver}`);
        unit.release(receiver);
      } else {
        unit.log(`unbinds ${direction} and rescues nothing`);
      }
    },
  });
}

export default rescue;
