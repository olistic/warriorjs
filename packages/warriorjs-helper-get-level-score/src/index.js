import getClearBonus from './getClearBonus';
import getGradeForScore from './getGradeForScore';
import getRemainingTimeBonus from './getRemainingTimeBonus';
import getWarriorScore from './getWarriorScore';

/**
 * Returns the score for the given play.
 *
 * @param {Object} play The play.
 * @param {boolean} play.passed Whether the level was passed or not.
 * @param {Object[][]} play.events The events that happened during the play.
 * @param {Object} levelConfig The level config.
 * @param {number} levelConfig.timeBonus The bonus for passing the level in time.
 * @param {number} levelConfig.aceScore The score in which to base the grade.
 *
 * @returns {Object} The score of the play.
 */
function getLevelScore({ passed, events }, { timeBonus, aceScore }) {
  if (!passed) {
    return null;
  }

  const warriorScore = getWarriorScore(events);
  const remainingTimeBonus = getRemainingTimeBonus(events, timeBonus);
  const clearBonus = getClearBonus(events, warriorScore, remainingTimeBonus);
  const totalScore = warriorScore + remainingTimeBonus + clearBonus;
  const grade = getGradeForScore(totalScore, aceScore);
  return {
    grade,
    parts: {
      clearBonus,
      warrior: warriorScore,
      timeBonus: remainingTimeBonus,
    },
    total: totalScore,
  };
}

export default getLevelScore;
