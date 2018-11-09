/**
 * Returns the last event of the play.
 *
 * @param {Object[][]} events The events that happened during the play.
 *
 * @returns {Object} The last event.
 */
function getLastEvent(events) {
  const lastTurnEvents = events[events.length - 1];
  return lastTurnEvents[lastTurnEvents.length - 1];
}

export default getLastEvent;
