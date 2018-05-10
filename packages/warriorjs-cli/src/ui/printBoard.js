import ansiEscapes from 'ansi-escapes';

import print from './print';
import printFloorMap from './printFloorMap';
import printWarriorStatus from './printWarriorStatus';

const warriorStatusRows = 2;

/**
 * Prints the game board after moving the cursor up a given number of rows.
 *
 * @param {Object} floor The level floor.
 * @param {number} offset The number of rows.
 */
function printBoard(floor, offset) {
  if (offset > 0) {
    const floorMapRows = floor.map.length;
    print(ansiEscapes.cursorUp(offset + floorMapRows + warriorStatusRows));
  }

  printWarriorStatus(floor.warrior);
  printFloorMap(floor.map);

  if (offset > 0) {
    print(ansiEscapes.cursorDown(offset));
  }
}

export default printBoard;
