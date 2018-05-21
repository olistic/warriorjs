import printFloorMap from './printFloorMap';
import printLevelDescription from './printLevelDescription';
import printLevelHeader from './printLevelHeader';

/**
 * Prints the level.
 *
 * @param {Object} level The level to print.
 * @param {number} level.number The number of the level.
 * @param {string} level.description The description of the level.
 * @param {Object} level.floor.map The map of the floor.
 */
function printLevel({ number, description, floor: { map } }) {
  printLevelHeader(number);
  printLevelDescription(description);
  printFloorMap(map);
}

export default printLevel;
