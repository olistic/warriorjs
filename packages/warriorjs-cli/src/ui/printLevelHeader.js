import chalk from 'chalk';

import printRow from './printRow';

/**
 * Prints the level header.
 *
 * @param {number} levelNumber The level number.
 */
function printLevelHeader(levelNumber) {
  printRow(` level ${levelNumber} `, 'center', chalk.gray('#'));
}

export default printLevelHeader;
