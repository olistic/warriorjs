import { BACKWARD, type RelativeDirection } from '@warriorjs/geography';

import type { Unit } from './types.js';

const defaultDirection = BACKWARD;

function pivot() {
  return (unit: Unit) => ({
    action: true as const,
    description: `Rotates in the given direction (\`'${defaultDirection}'\` by default).`,
    perform(direction: RelativeDirection = defaultDirection) {
      unit.rotate(direction);
      unit.log(`pivots ${direction}`);
    },
  });
}

export default pivot;
