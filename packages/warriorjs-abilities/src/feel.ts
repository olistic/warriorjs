import { FORWARD, type RelativeDirection } from '@warriorjs/geography';

import type { Unit } from './types.js';

const defaultDirection = FORWARD;

function feel() {
  return (unit: Unit) => ({
    description: `Returns the adjacent space in the given direction (\`'${defaultDirection}'\` by default).`,
    perform(direction: RelativeDirection = defaultDirection) {
      return unit.getSensedSpaceAt(direction);
    },
    meta: {
      params: [{ name: 'direction', type: 'Direction' as const, optional: true }],
      returns: 'Space' as const,
    },
  });
}

export default feel;
