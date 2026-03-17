import { Sense } from '@warriorjs/core';
import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/spatial';
import type { AbilityMeta } from './types.js';

class DirectionOf extends Sense {
  readonly description =
    `Returns the direction (${FORWARD}, ${RIGHT}, ${BACKWARD} or ${LEFT}) to the given space.`;
  readonly meta: AbilityMeta = {
    params: [{ name: 'space', type: 'Space' }],
    returns: 'Direction',
  };

  perform(space: unknown) {
    return this.unit.getDirectionOf(space);
  }
}

export default DirectionOf;
