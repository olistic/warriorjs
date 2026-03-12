import { FORWARD, getRelativeOffset } from '@warriorjs/spatial';

import type { Unit } from './types.js';

function listen() {
  return (unit: Unit) => ({
    description: 'Returns an array of all spaces which have units in them (excluding yourself).',
    perform() {
      return unit
        .getOtherUnits()
        .map((anotherUnit) =>
          getRelativeOffset(
            anotherUnit.getSpace().location,
            unit.position.location,
            unit.position.orientation,
          ),
        )
        .map(([forward, right]) => unit.getSensedSpaceAt(FORWARD, forward, right));
    },
    meta: {
      params: [],
      returns: 'Space[]' as const,
    },
  });
}

export default listen;
