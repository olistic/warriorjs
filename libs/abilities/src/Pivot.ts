import { Action } from '@warriorjs/core';
import { BACKWARD, type RelativeDirection } from '@warriorjs/spatial';
import type { AbilityMeta } from './types.js';

const defaultDirection = BACKWARD;

class Pivot extends Action {
  readonly description = `Rotates in the given direction (\`'${defaultDirection}'\` by default).`;
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'void',
  };

  perform(direction: RelativeDirection = defaultDirection): void {
    this.unit.rotate(direction);
    this.unit.log(`pivots ${direction}`);
  }
}

export default Pivot;
