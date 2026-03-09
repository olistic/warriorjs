/**
 * Returns the number of turns played.
 *
 * @param events The events that happened during the play.
 * @returns The turn count.
 */
function getTurnCount(events: unknown[][]): number {
  return events.length;
}

export default getTurnCount;
