import type Unit from './Unit.js';

export interface WarriorConfig {
  name?: string;
  character: string;
  color: string;
  maxHealth: number;
  abilities?: Record<string, any>;
  position: { x: number; y: number; facing: string };
}

export interface UnitConfig {
  unit: new () => Unit;
  effects?: Record<string, any>;
  position: { x: number; y: number; facing: string };
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

export interface TowerLevel {
  description: string;
  tip: string;
  clue?: string;
  timeBonus: number;
  aceScore: number;
  floor: {
    size: { width: number; height: number };
    stairs: { x: number; y: number };
    warrior: WarriorConfig;
    units: UnitConfig[];
  };
}

export interface TowerDefinition {
  name: string;
  description: string;
  levels: TowerLevel[];
}
