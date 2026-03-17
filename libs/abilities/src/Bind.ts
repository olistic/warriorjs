import { Action } from '@warriorjs/core';
import { FORWARD, type RelativeDirection } from '@warriorjs/spatial';
import type { AbilityMeta } from './types.js';

const defaultDirection = FORWARD;

class Bind extends Action {
  readonly description =
    `Binds a unit in the given direction (\`'${defaultDirection}'\` by default) to keep them from moving.`;
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'void',
  };

  perform(direction: RelativeDirection = defaultDirection): void {
    const receiver = this.unit.getSpaceAt(direction).getUnit();
    if (receiver) {
      this.unit.log(`binds ${direction} and restricts ${receiver}`);
      receiver.bind();
    } else {
      this.unit.log(`binds ${direction} and restricts nothing`);
    }
  }
}

export default Bind;
