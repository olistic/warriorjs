import type { AbsoluteDirection, RelativeDirection } from '@warriorjs/spatial';

export interface Space {
  getUnit(): Unit | null;
  isEmpty(): boolean;
  isWall(): boolean;
  location: [number, number];
  toString(): string;
}

export interface SensedSpace {
  isWall(): boolean;
}

export interface Unit {
  health: number;
  maxHealth: number;
  position: {
    location: [number, number];
    orientation: AbsoluteDirection;
  };
  getSpaceAt(direction: RelativeDirection, forward?: number, right?: number): Space;
  getSensedSpaceAt(direction: RelativeDirection, forward?: number, right?: number): SensedSpace;
  getDirectionOf(space: unknown): RelativeDirection;
  getDirectionOfStairs(): RelativeDirection;
  getDistanceOf(space: unknown): number;
  getOtherUnits(): Array<{ getSpace(): { location: [number, number] } }>;
  getSpace(): { location: [number, number] };
  move(direction: RelativeDirection): void;
  rotate(direction: RelativeDirection): void;
  damage(receiver: unknown, amount: number): void;
  heal(amount: number): void;
  release(receiver: unknown): void;
  bind(): void;
  isBound(): boolean;
  isUnderEffect(effect: string): boolean;
  triggerEffect(effect: string): void;
  log(message: string): void;
  toString(): string;
}

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
