import chalk from 'chalk';

import printRow from './printRow';

/**
 * Prints the turn header.
 *
 * @param {number} turnNumber The turn number.
 */
function printTurnHeader(turnNumber) {
  printRow(chalk.gray.dim(` ${String(turnNumber).padStart(3, '0')} `), {
    position: 'middle',
    padding: chalk.gray.dim('~'),
  });
}

export default printTurnHeader;
