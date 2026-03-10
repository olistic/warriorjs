import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/geography';

import type { Unit } from './types.js';

function directionOfStairs() {
  return (unit: Unit) => ({
    description: `Returns the direction (${FORWARD}, ${RIGHT}, ${BACKWARD} or ${LEFT}) the stairs are from your location.`,
    perform() {
      return unit.getDirectionOfStairs();
    },
  });
}

export default directionOfStairs;
