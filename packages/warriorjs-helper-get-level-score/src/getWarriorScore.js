import getLastEvent from './getLastEvent';

/**
 * Returns the score of the warrior.
 *
 * @param {Object[][]} events The events that happened during the play.
 *
 * @returns {number} The score of the warrior.
 */
function getWarriorScore(events) {
  const lastEvent = getLastEvent(events);
  return lastEvent.warriorStatus.score;
}

export default getWarriorScore;
