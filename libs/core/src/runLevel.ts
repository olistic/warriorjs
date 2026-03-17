import type { TurnEvent } from './Logger.js';
import loadLevel from './loadLevel.js';
import type { LevelConfig } from './types.js';

function runLevel(
  levelConfig: LevelConfig,
  playerCode: string,
  language: 'javascript' | 'typescript' = 'javascript',
): { passed: boolean; turns: TurnEvent[][]; initialState: TurnEvent | null } {
  return loadLevel(levelConfig, playerCode, language).play();
}

export default runLevel;
