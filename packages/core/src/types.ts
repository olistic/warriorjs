export interface UnitConfig {
  name: string;
  character: string;
  color: string;
  maxHealth: number;
  reward?: number;
  enemy?: boolean;
  bound?: boolean;
  abilities?: Record<string, (unit: any) => any>;
  effects?: Record<string, (unit: any) => any>;
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
    units?: UnitConfig[];
  };
}

export interface TowerFloorUnit {
  [key: string]: unknown;
  position: { x: number; y: number; facing?: string };
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
    warrior: TowerFloorUnit;
    units: TowerFloorUnit[];
  };
}

export interface TowerDefinition {
  name: string;
  description: string;
  levels: TowerLevel[];
}
