import chalk from 'chalk';

import printRow from './printRow';

/**
 * Prints the turn header.
 *
 * @param {number} turnNumber The turn number.
 */
function printTurnHeader(turnNumber) {
  printRow(` turn ${String(turnNumber).padStart(3, '0')} `, {
    position: 'middle',
    padding: chalk.gray('-'),
  });
}

export default printTurnHeader;
