import { Effect } from '@warriorjs/core';

interface TickingConfig {
  time: number;
}

class Ticking extends Effect {
  readonly description = 'Kills you and all surrounding units when time reaches zero.';

  time: number;

  constructor(unit: any, { time }: TickingConfig) {
    super(unit);
    this.time = time;
  }

  passTurn(): void {
    if (this.time) {
      this.time -= 1;
    }

    this.unit.log('is ticking');

    if (!this.time) {
      this.trigger();
    }
  }

  trigger(): void {
    this.unit.log('explodes, collapsing the ceiling and killing every unit');
    [...this.unit.getOtherUnits(), this.unit].forEach((anotherUnit: any) =>
      anotherUnit.takeDamage(anotherUnit.health),
    );
  }

  static with(config: TickingConfig) {
    return [Ticking, config] as [new (unit: any, config: any) => Ticking, object];
  }
}

export default Ticking;
