/**
 * Returns the last event of the play.
 *
 * @param events The events that happened during the play.
 * @returns The last event.
 */
function getLastEvent(events: unknown[][]): Record<string, unknown> {
  const lastTurnEvents = events.at(-1)!;
  return lastTurnEvents.at(-1) as Record<string, unknown>;
}

export default getLastEvent;
