import loadLevel from './loadLevel.js';
import type { LevelConfig } from './types.js';

function getLevel(levelConfig: LevelConfig): any {
  const level = loadLevel(levelConfig);
  return JSON.parse(JSON.stringify(level));
}

export default getLevel;
