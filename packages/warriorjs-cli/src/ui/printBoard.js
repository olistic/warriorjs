import ansiEscapes from 'ansi-escapes';

import print from './print';
import printFloorMap from './printFloorMap';
import printWarriorStatus from './printWarriorStatus';

const warriorStatusRows = 2;

/**
 * Prints the game board after moving the cursor up a given number of rows.
 *
 * @param {Object[][]} floorMap The map of the floor.
 * @param {Object} warriorStatus The status of the warrior.
 * @param {number} offset The number of rows.
 */
function printBoard(floorMap, warriorStatus, offset) {
  if (offset > 0) {
    const floorMapRows = floorMap.length;
    print(ansiEscapes.cursorUp(offset + floorMapRows + warriorStatusRows));
  }

  printWarriorStatus(warriorStatus);
  printFloorMap(floorMap);

  if (offset > 0) {
    print(ansiEscapes.cursorDown(offset));
  }
}

export default printBoard;
