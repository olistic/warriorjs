import printHeader from './printHeader';

/**
 * Prints the level header.
 *
 * @param {number} levelNumber The level number.
 */
function printLevelHeader(levelNumber) {
  printHeader(`level ${levelNumber}`, '#');
}

export default printLevelHeader;
