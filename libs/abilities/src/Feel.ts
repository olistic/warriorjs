import { Sense } from '@warriorjs/core';
import { FORWARD, type RelativeDirection } from '@warriorjs/spatial';
import type { AbilityMeta } from './types.js';

const defaultDirection = FORWARD;

class Feel extends Sense {
  readonly description =
    `Returns the adjacent space in the given direction (\`'${defaultDirection}'\` by default).`;
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'Space',
  };

  perform(direction: RelativeDirection = defaultDirection) {
    return this.unit.getSensedSpaceAt(direction);
  }
}

export default Feel;
