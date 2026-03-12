import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';

import type { Unit } from './types.js';

function directionOf() {
  return (unit: Unit) => ({
    description: `Returns the direction (${FORWARD}, ${RIGHT}, ${BACKWARD} or ${LEFT}) to the given space.`,
    perform(space: unknown) {
      return unit.getDirectionOf(space);
    },
    meta: {
      params: [{ name: 'space', type: 'Space' as const }],
      returns: 'Direction' as const,
    },
  });
}

export default directionOf;
