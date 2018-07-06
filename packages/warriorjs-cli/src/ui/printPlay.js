import sleep from 'delay';

import printBoard from './printBoard';
import printTurnHeader from './printTurnHeader';
import printLogMessage from './printLogMessage';

/**
 * Prints a play.
 *
 * @param {Object[]} events The events that happened during the play.
 * @param {nunber} delay The delay between each turn in ms.
 */
async function printPlay(events, delay) {
  let turnNumber = 0;
  let boardOffset = 0;

  await sleep(delay);

  // eslint-disable-next-line no-restricted-syntax
  for (const turnEvents of events) {
    turnNumber += 1;
    boardOffset = 0;
    printTurnHeader(turnNumber);

    // eslint-disable-next-line no-restricted-syntax
    for (const event of turnEvents) {
      printBoard(event.floorMap, event.warriorStatus, boardOffset);
      printLogMessage(event.unit, event.message);
      boardOffset += 1;

      await sleep(delay); // eslint-disable-line no-await-in-loop
    }
  }
}

export default printPlay;
