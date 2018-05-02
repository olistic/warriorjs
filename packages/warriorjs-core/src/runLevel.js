import LevelLoader from './LevelLoader';
import PlayerLoader from './PlayerLoader';

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
  const player = new PlayerLoader().load(playerCode);
  level.floor.warrior.player = player;
  return level.play();
}

export default runLevel;
