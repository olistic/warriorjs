import { Sense } from '@warriorjs/core';
import { FORWARD, getRelativeOffset } from '@warriorjs/spatial';
import type { AbilityMeta } from './types.js';

class Listen extends Sense {
  readonly description =
    'Returns an array of all spaces which have units in them (excluding yourself).';
  readonly meta: AbilityMeta = {
    params: [],
    returns: 'Space[]',
  };

  perform() {
    return this.unit
      .getOtherUnits()
      .map((anotherUnit: any) =>
        getRelativeOffset(
          anotherUnit.getSpace().location,
          this.unit.position.location,
          this.unit.position.orientation,
        ),
      )
      .map(([forward, right]: [number, number]) =>
        this.unit.getSensedSpaceAt(FORWARD, forward, right),
      );
  }
}

export default Listen;
