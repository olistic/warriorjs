import type { AbilityEntry } from './Ability.js';
import type { EffectEntry } from './Effect.js';
import type { UnitClass } from './Unit.js';

export interface UnitConfig {
  unit: UnitClass;
  position: { x: number; y: number; facing: string };
  effects?: Record<string, EffectEntry>;
}

export interface WarriorConfig {
  name?: string;
  character: string;
  color: string;
  maxHealth: number;
  position: { x: number; y: number; facing: string };
  abilities?: Record<string, AbilityEntry>;
}

export interface LevelConfig {
  number?: number;
  description?: string;
  tip?: string;
  clue?: string;
  timeBonus?: number;
  aceScore?: number;
  floor: {
    size: { width: number; height: number };
    stairs: { x: number; y: number };
    warrior: WarriorConfig;
    units?: UnitConfig[];
  };
}

export interface WarriorDefinition {
  character: string;
  color: string;
  maxHealth: number;
}

export interface WarriorOverrides {
  position: { x: number; y: number; facing: string };
  abilities?: Record<string, AbilityEntry>;
  maxHealth?: number;
}

export interface LevelDefinition {
  description: string;
  tip: string;
  clue?: string;
  timeBonus: number;
  aceScore: number;
  floor: {
    size: { width: number; height: number };
    stairs: { x: number; y: number };
    warrior: WarriorOverrides;
    units: UnitConfig[];
  };
}

export interface TowerDefinition {
  name: string;
  description: string;
  warrior: WarriorDefinition;
  levels: LevelDefinition[];
}
