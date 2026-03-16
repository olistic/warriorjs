import type { AbilityBinding } from './Ability.js';
import Action from './Action.js';
import type { AbilityMeta, Unit } from './types.js';

interface RestConfig {
  healthGain: number;
}

class Rest extends Action {
  private healthGain: number;
  readonly description: string;
  readonly meta: AbilityMeta = {
    params: [],
    returns: 'void',
  };

  constructor(unit: Unit, { healthGain }: RestConfig) {
    super(unit);
    this.healthGain = healthGain;
    const healthGainPercentage = healthGain * 100;
    this.description = `Gains ${healthGainPercentage}% of max health back, but does nothing more.`;
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
