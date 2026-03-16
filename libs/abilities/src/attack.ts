import { BACKWARD, FORWARD, type RelativeDirection } from '@warriorjs/spatial';

import type { AbilityBinding } from './Ability.js';
import Action from './Action.js';
import type { AbilityMeta, Unit } from './types.js';

const defaultDirection = FORWARD;

interface AttackConfig {
  power: number;
}

class Attack extends Action {
  private power: number;
  readonly description: string;
  readonly meta: AbilityMeta = {
    params: [{ name: 'direction', type: 'Direction', optional: true }],
    returns: 'void',
  };

  constructor(unit: Unit, { power }: AttackConfig) {
    super(unit);
    this.power = power;
    this.description = `Attacks a unit in the given direction (\`'${defaultDirection}'\` by default), dealing ${power} HP of damage.`;
  }

  perform(direction: RelativeDirection = defaultDirection): void {
    const receiver = this.unit.getSpaceAt(direction).getUnit();
    if (receiver) {
      this.unit.log(`attacks ${direction} and hits ${receiver}`);
      const attackingBackward = direction === BACKWARD;
      const amount = attackingBackward ? Math.ceil(this.power / 2.0) : this.power;
      this.unit.damage(receiver, amount);
    } else {
      this.unit.log(`attacks ${direction} and hits nothing`);
    }
  }

  static with(config: AttackConfig): AbilityBinding {
    return [Attack, config];
  }
}

export default Attack;
