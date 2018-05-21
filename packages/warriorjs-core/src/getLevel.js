import loadLevel from './loadLevel';

/**
 * Returns the level for the given level config.
 *
 * @param {Object} levelConfig The config of the level.
 *
 * @returns {Object} The level.
 */
function getLevel(levelConfig) {
  const level = loadLevel(levelConfig);
  return JSON.parse(JSON.stringify(level));
}

export default getLevel;
