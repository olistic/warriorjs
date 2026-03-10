import loadLevel from './loadLevel.js';

function runLevel(levelConfig: any, playerCode: string): { passed: boolean; events: any[][] } {
  const level = loadLevel(levelConfig, playerCode);
  return level.play();
}

export default runLevel;
