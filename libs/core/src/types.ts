import type Unit from './Unit.js';

export interface UnitConfig {
  name: string;
  character: string;
  color: string;
  maxHealth: number;
  reward?: number;
  enemy?: boolean;
  bound?: boolean;
  abilities?: Record<string, any>;
  effects?: Record<string, any>;
  playTurn?: (turn: any) => void;
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
    warrior: UnitConfig;
    units?: (UnitConfig | TowerUnitEntry)[];
  };
}

export interface TowerUnitEntry {
  unit: new () => Unit;
  effects?: Record<string, any>;
  position: { x: number; y: number; facing: string };
}

export interface TowerWarriorEntry {
  character: string;
  color: string;
  maxHealth: number;
  abilities?: Record<string, any>;
  position: { x: number; y: number; facing: string };
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
    warrior: TowerWarriorEntry;
    units: TowerUnitEntry[];
  };
}

export interface TowerDefinition {
  name: string;
  description: string;
  levels: TowerLevel[];
}
