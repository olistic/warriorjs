import { Action } from '@warriorjs/core';
import { FORWARD, type RelativeDirection } from '@warriorjs/spatial';
import type { AbilityMeta } from './types.js';

const defaultDirection = FORWARD;

class Rescue extends Action {
  readonly description =
    `Releases a unit from their chains in the given direction (\`'${defaultDirection}'\` by default).`;
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'void',
  };

  perform(direction: RelativeDirection = defaultDirection): void {
    const receiver = this.unit.getSpaceAt(direction).getUnit();
    if (receiver?.isBound()) {
      this.unit.log(`unbinds ${direction} and rescues ${receiver}`);
      this.unit.release(receiver);
    } else {
      this.unit.log(`unbinds ${direction} and rescues nothing`);
    }
  }
}

export default Rescue;
