import getLastEvent from './getLastEvent.js';

/**
 * Returns the score of the warrior.
 *
 * @param events The events that happened during the play.
 * @returns The score of the warrior.
 */
function getWarriorScore(events: unknown[][]): number {
  const lastEvent = getLastEvent(events);
  return (lastEvent as { warriorStatus: { score: number } }).warriorStatus.score;
}

export default getWarriorScore;
