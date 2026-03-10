import loadLevel from './loadLevel.js';

function getLevel(levelConfig: any): any {
  const level = loadLevel(levelConfig);
  return JSON.parse(JSON.stringify(level));
}

export default getLevel;
