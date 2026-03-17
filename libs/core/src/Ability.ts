export interface AbilityParam {
  name: string;
  type: 'Direction' | 'Space' | 'number' | 'any';
  optional?: boolean;
  rest?: boolean;
}

export interface AbilityMeta {
  params: AbilityParam[];
  returns: 'void' | 'number' | 'string' | 'Direction' | 'Space' | 'Space[]';
}

export interface AbilityClass {
  new (unit: any, config?: any): Ability;
}

export type AbilityBinding = [AbilityClass, object];

export type AbilityEntry = AbilityBinding | AbilityClass;

abstract class Ability {
  protected unit: any;

  abstract readonly description: string;
  abstract readonly meta: AbilityMeta;

  constructor(unit: any, _config?: Record<string, unknown>) {
    this.unit = unit;
  }

  abstract perform(...args: unknown[]): unknown;
}

export default Ability;
