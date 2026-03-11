import { FORWARD, type RelativeDirection } from '@warriorjs/geography';

import type { Unit } from './types.js';

const defaultDirection = FORWARD;

function bind() {
  return (unit: Unit) => ({
    action: true as const,
    description: `Binds a unit in the given direction (\`'${defaultDirection}'\` by default) to keep him from moving.`,
    perform(direction: RelativeDirection = defaultDirection) {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver) {
        unit.log(`binds ${direction} and restricts ${receiver}`);
        receiver.bind();
      } else {
        unit.log(`binds ${direction} and restricts nothing`);
      }
    },
    meta: {
      params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
      returns: 'void' as const,
    },
  });
}

export default bind;
