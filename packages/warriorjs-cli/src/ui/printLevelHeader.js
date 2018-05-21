import chalk from 'chalk';

import printRow from './printRow';

/**
 * Prints the level header.
 *
 * @param {number} levelNumber The level number.
 */
function printLevelHeader(levelNumber) {
  printRow(chalk.gray.dim(` level ${levelNumber} `), {
    position: 'middle',
    padding: chalk.gray.dim('~'),
  });
}

export default printLevelHeader;
