import { FORWARD, type RelativeDirection } from '@warriorjs/spatial';

import type { Unit } from './types.js';

const defaultDirection = FORWARD;

function walk() {
  return (unit: Unit) => ({
    action: true as const,
    description: `Moves one space in the given direction (\`'${defaultDirection}'\` by default).`,
    perform(direction: RelativeDirection = defaultDirection) {
      const space = unit.getSpaceAt(direction);
      if (space.isEmpty()) {
        unit.move(direction);
        unit.log(`walks ${direction}`);
      } else {
        unit.log(`walks ${direction} and bumps into ${space}`);
      }
    },
    meta: {
      params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
      returns: 'void' as const,
    },
  });
}

export default walk;
