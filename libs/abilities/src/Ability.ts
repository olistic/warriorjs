import type { AbilityMeta, Unit } from './types.js';

export type AbilityBinding = [new (unit: any, config: any) => Ability, object];

abstract class Ability {
  protected unit: Unit;

  abstract readonly description: string;
  abstract readonly meta: AbilityMeta;

  constructor(unit: Unit, _config?: Record<string, unknown>) {
    this.unit = unit;
  }

  abstract perform(...args: unknown[]): unknown;
}

export default Ability;
