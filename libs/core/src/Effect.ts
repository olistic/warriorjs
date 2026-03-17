export type EffectBinding = [new (unit: any, config: any) => Effect, object];

abstract class Effect {
  protected unit: any;

  abstract readonly description: string;

  constructor(unit: any, _config?: Record<string, unknown>) {
    this.unit = unit;
  }

  abstract passTurn(): void;
  abstract trigger(): void;
}

export default Effect;
