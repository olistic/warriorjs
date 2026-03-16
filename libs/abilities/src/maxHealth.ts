import Sense from './Sense.js';
import type { AbilityMeta } from './types.js';

class MaxHealth extends Sense {
  readonly description = 'Returns an integer representing your maximum health.';
  readonly meta: AbilityMeta = {
    params: [],
    returns: 'number',
  };

  perform() {
    return this.unit.maxHealth;
  }
}

export default MaxHealth;
