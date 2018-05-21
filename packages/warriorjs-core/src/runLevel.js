import loadLevel from './loadLevel';

/**
 * Runs the given level config.
 *
 * @param {Object} levelConfig The config of the level.
 * @param {string} playerCode The code of the player.
 *
 * @returns {Object} The outcome of the play.
 */
function runLevel(levelConfig, playerCode) {
  const level = loadLevel(levelConfig, playerCode);
  return level.play();
}

export default runLevel;
