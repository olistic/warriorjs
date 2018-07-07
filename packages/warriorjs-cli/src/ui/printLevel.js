import printFloorMap from './printFloorMap';
import printLevelHeader from './printLevelHeader';

/**
 * Prints the level.
 *
 * @param {Object} level The level to print.
 * @param {number} level.number The number of the level.
 * @param {Object[][]} level.floorMap The map of the floor.
 */
function printLevel({ number, floorMap }) {
  printLevelHeader(number);
  printFloorMap(floorMap);
}

export default printLevel;
