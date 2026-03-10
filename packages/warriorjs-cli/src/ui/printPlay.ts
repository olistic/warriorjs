import sleep from 'delay';

import printBoard from './printBoard.js';
import printLogMessage from './printLogMessage.js';
import printTurnHeader from './printTurnHeader.js';

interface PlayEvent {
  floorMap: unknown[][];
  warriorStatus: { health: number; score: number };
  unit: { name: string; color: string; [key: string]: unknown };
  message: string;
}

async function printPlay(events: PlayEvent[][], delay: number): Promise<void> {
  let turnNumber = 0;
  let boardOffset = 0;

  await sleep(delay);

  for (const turnEvents of events) {
    turnNumber += 1;
    boardOffset = 0;
    printTurnHeader(turnNumber);

    for (const event of turnEvents) {
      printBoard(event.floorMap, event.warriorStatus, boardOffset);
      printLogMessage(event.unit, event.message);
      boardOffset += 1;

      await sleep(delay);
    }
  }
}

export default printPlay;
