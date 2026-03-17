import { Sense } from '@warriorjs/core';
import type { AbilityMeta } from './types.js';

class Health extends Sense {
  readonly description = 'Returns an integer representing your health.';
  readonly meta: AbilityMeta = {
    params: [],
    returns: 'number',
  };

  perform() {
    return this.unit.health;
  }
}

export default Health;
