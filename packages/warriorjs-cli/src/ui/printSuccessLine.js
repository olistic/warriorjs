import chalk from 'chalk';

import printLine from './printLine';

/**
 * Prints a message in color green followed by a line-break.
 *
 * @param {string} message The message to print.
 */
function printSuccessLine(message) {
  printLine(chalk.green(message));
}

export default printSuccessLine;
