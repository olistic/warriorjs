import type { AbilityBinding } from '@warriorjs/core';

import { Sense } from '@warriorjs/core';
import { FORWARD, type RelativeDirection } from '@warriorjs/spatial';
import type { AbilityMeta, Unit } from './types.js';

const defaultDirection = FORWARD;

interface LookConfig {
  range: number;
}

class Look extends Sense {
  readonly description: string;
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'Space[]',
  };

  private range: number;

  constructor(unit: Unit, { range }: LookConfig) {
    super(unit);
    this.description = `Returns an array of up to ${range} spaces in the given direction (\`'${defaultDirection}'\` by default).`;
    this.range = range;
  }

  perform(direction: RelativeDirection = defaultDirection) {
    const offsets = Array.from(new Array(this.range), (_, index) => index + 1);
    const spaces = offsets.map((offset) => this.unit.getSensedSpaceAt(direction, offset));
    const firstWallIndex = spaces.findIndex((space) => space?.isWall());
    return firstWallIndex === -1 ? spaces : spaces.slice(0, firstWallIndex + 1);
  }

  static with(config: LookConfig): AbilityBinding {
    return [Look, config];
  }
}

export default Look;
