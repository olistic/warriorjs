import getLastEvent from './getLastEvent';
import isFloorClear from './isFloorClear';

/**
 * Returns the bonus for clearing the level.
 *
 * @param {Object[][]} events The events that happened during the play.
 * @param {number} warriorScore The score of the warrior.
 * @param {number} timeBonus The time bonus.
 *
 * @returns {number} The clear bonus.
 */
function getClearBonus(events, warriorScore, timeBonus) {
  const lastEvent = getLastEvent(events);
  if (!isFloorClear(lastEvent.floorMap)) {
    return 0;
  }

  return Math.round((warriorScore + timeBonus) * 0.2);
}

export default getClearBonus;
