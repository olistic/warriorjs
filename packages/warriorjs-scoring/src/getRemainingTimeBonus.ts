import getTurnCount from './getTurnCount.js';

/**
 * Returns the remaining time bonus.
 *
 * @param events The events that happened during the play.
 * @param timeBonus The initial time bonus.
 * @returns The time bonus.
 */
function getRemainingTimeBonus(events: unknown[][], timeBonus: number): number {
  const turnCount = getTurnCount(events);
  const remainingTimeBonus = timeBonus - turnCount;
  return Math.max(remainingTimeBonus, 0);
}

export default getRemainingTimeBonus;
