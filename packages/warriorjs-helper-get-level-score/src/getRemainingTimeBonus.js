import getTurnCount from './getTurnCount';

/**
 * Returns the remaining time bonus.
 *
 * @param {Object[][]} events The events that happened during the play.
 * @param {number} timeBonus The initial time bonus.
 *
 * @returns {number} The time bonus.
 */
function getRemainingTimeBonus(events, timeBonus) {
  const turnCount = getTurnCount(events);
  const remainingTimeBonus = timeBonus - turnCount;
  return Math.max(remainingTimeBonus, 0);
}

export default getRemainingTimeBonus;
