import getClearBonus from './getClearBonus';
import getRemainingTimeBonus from './getRemainingTimeBonus';
import getWarriorScore from './getWarriorScore';

/**
 * Returns the score for the given level.
 *
 * @param {Object} result The level result.
 * @param {boolean} result.passed Whether the level was passed or not.
 * @param {Object[][]} result.events The events of the level.
 * @param {Object} levelConfig The level config.
 * @param {number} levelConfig.timeBonus The bonus for passing the level in time.
 *
 * @returns {Object} The score of the level, broken down into its components.
 */
function getLevelScore({ passed, events }, { timeBonus }) {
  if (!passed) {
    return null;
  }

  const warriorScore = getWarriorScore(events);
  const remainingTimeBonus = getRemainingTimeBonus(events, timeBonus);
  const clearBonus = getClearBonus(events, warriorScore, remainingTimeBonus);
  return {
    clearBonus,
    timeBonus: remainingTimeBonus,
    warrior: warriorScore,
  };
}

export default getLevelScore;
