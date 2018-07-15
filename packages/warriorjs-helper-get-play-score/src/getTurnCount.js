/**
 * Returns the number of turns played.
 *
 * @param {Object[][]} events The events that happened during the play.
 *
 * @returns {number} The turn count.
 */
function getTurnCount(events) {
  return events.length;
}

export default getTurnCount;
