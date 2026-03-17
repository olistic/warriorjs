import { Sense } from '@warriorjs/core';
import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import type { AbilityMeta } from './types.js';

class DirectionOfStairs extends Sense {
  readonly description =
    `Returns the direction (${FORWARD}, ${RIGHT}, ${BACKWARD} or ${LEFT}) the stairs are from your location.`;
  readonly meta: AbilityMeta = {
    params: [],
    returns: 'Direction',
  };

  perform() {
    return this.unit.getDirectionOfStairs();
  }
}

export default DirectionOfStairs;
