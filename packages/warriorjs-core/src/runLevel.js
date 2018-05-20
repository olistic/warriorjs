import loadPlayer from '@warriorjs/player-loader';

import LevelLoader from './LevelLoader';
import PlayerError from './PlayerError';

/**
 * Runs the given level config.
 *
 * @param {Object} levelConfig The config of the level.
 * @param {string} playerCode The code of the player.
 *
 * @returns {Object} The outcome of the play.
 */
function runLevel(levelConfig, playerCode) {
  const level = new LevelLoader().load(levelConfig);
  try {
    level.floor.warrior.player = loadPlayer(playerCode);
  } catch (err) {
    throw new PlayerError(err.message);
  }
  return level.play();
}

export default runLevel;
