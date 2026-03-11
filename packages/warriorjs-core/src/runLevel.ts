import loadLevel from './loadLevel.js';

function runLevel(
  levelConfig: any,
  playerCode: string,
  language: 'javascript' | 'typescript' = 'javascript',
): { passed: boolean; events: any[][] } {
  const level = loadLevel(levelConfig, playerCode, language);
  return level.play();
}

export default runLevel;
