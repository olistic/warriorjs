import ansiEscapes from 'ansi-escapes';

import print from './print.js';
import printFloorMap from './printFloorMap.js';
import printWarriorStatus from './printWarriorStatus.js';

const warriorStatusRows = 2;

function printBoard(floorMap: any, warriorStatus: any, offset?: number): void {
  if (offset && offset > 0) {
    const floorMapRows = floorMap.length;
    print(ansiEscapes.cursorUp(offset + floorMapRows + warriorStatusRows));
  }

  printWarriorStatus(warriorStatus);
  printFloorMap(floorMap);

  if (offset && offset > 0) {
    print(ansiEscapes.cursorDown(offset));
  }
}

export default printBoard;
