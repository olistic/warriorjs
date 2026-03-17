import type { AbilityBinding } from '@warriorjs/core';

import { Action } from '@warriorjs/core';
import { FORWARD, type RelativeDirection } from '@warriorjs/spatial';
import type { AbilityMeta, Unit } from './types.js';

const defaultDirection = FORWARD;

interface ShootConfig {
  power: number;
  range: number;
}

class Shoot extends Action {
  readonly description: string;
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'void',
  };

  private power: number;
  private range: number;

  constructor(unit: Unit, { power, range }: ShootConfig) {
    super(unit);
    this.description = `Shoots the bow & arrow in the given direction (\`'${defaultDirection}'\` by default), dealing ${power} HP of damage to the first unit in a range of ${range} spaces.`;
    this.power = power;
    this.range = range;
  }

  perform(direction: RelativeDirection = defaultDirection): void {
    const offsets = Array.from(new Array(this.range), (_, index) => index + 1);
    const receiver = offsets
      .map((offset) => this.unit.getSpaceAt(direction, offset).getUnit())
      .find((unitInRange) => unitInRange);
    if (receiver) {
      this.unit.log(`shoots ${direction} and hits ${receiver}`);
      this.unit.damage(receiver, this.power);
    } else {
      this.unit.log(`shoots ${direction} and hits nothing`);
    }
  }

  static with(config: ShootConfig): AbilityBinding {
    return [Shoot, config];
  }
}

export default Shoot;
