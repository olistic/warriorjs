import type { AbilityBinding } from '@warriorjs/core';
import { Action } from '@warriorjs/core';
import type { AbilityMeta, Unit } from './types.js';

interface RestConfig {
  healthGain: number;
}

class Rest extends Action {
  readonly description: string;
  readonly meta: AbilityMeta = {
    params: [],
    returns: 'void',
  };

  private healthGain: number;

  constructor(unit: Unit, { healthGain }: RestConfig) {
    super(unit);
    this.description = `Gains ${healthGain * 100}% of max health back, but does nothing more.`;
    this.healthGain = healthGain;
  }

  perform(): void {
    if (this.unit.health < this.unit.maxHealth) {
      this.unit.log('rests');
      const amount = Math.round(this.unit.maxHealth * this.healthGain);
      this.unit.heal(amount);
    } else {
      this.unit.log('has nothing to heal');
    }
  }

  static with(config: RestConfig): AbilityBinding {
    return [Rest, config];
  }
}

export default Rest;
