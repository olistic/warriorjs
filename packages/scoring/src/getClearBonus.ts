import getLastEvent from './getLastEvent.js';
import isFloorClear from './isFloorClear.js';

/**
 * Returns the bonus for clearing the level.
 *
 * @param events The events that happened during the play.
 * @param warriorScore The score of the warrior.
 * @param timeBonus The time bonus.
 * @returns The clear bonus.
 */
function getClearBonus(events: unknown[][], warriorScore: number, timeBonus: number): number {
  const lastEvent = getLastEvent(events);
  if (!isFloorClear(lastEvent.floorMap as { unit?: unknown }[][])) {
    return 0;
  }

  return Math.round((warriorScore + timeBonus) * 0.2);
}

export default getClearBonus;
