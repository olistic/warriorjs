import printHeader from './printHeader';

/**
 * Prints the level header.
 *
 * @param {number} levelNumber The level number.
 */
function printLevelHeader(levelNumber) {
  printHeader(`level ${String(levelNumber).padStart(3, '0')}`);
}

export default printLevelHeader;
