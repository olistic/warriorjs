import loadPlayer from '@warriorjs/player-loader';

import LevelLoader from './LevelLoader';

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
  level.floor.warrior.player = loadPlayer(playerCode);
  return level.play();
}

export default runLevel;
