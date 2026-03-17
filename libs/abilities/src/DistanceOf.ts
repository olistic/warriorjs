import { Sense } from '@warriorjs/core';
import type { AbilityMeta } from './types.js';

class DistanceOf extends Sense {
  readonly description = 'Returns an integer representing the distance to the given space.';
  readonly meta: AbilityMeta = {
    params: [{ name: 'space', type: 'Space' }],
    returns: 'number',
  };

  perform(space: unknown) {
    return this.unit.getDistanceOf(space);
  }
}

export default DistanceOf;
