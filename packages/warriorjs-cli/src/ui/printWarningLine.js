import chalk from 'chalk';

import printLine from './printLine';

/**
 * Prints a message in color yellow followed by a line-break.
 *
 * @param {string} message The message to print.
 */
function printWarningLine(message) {
  printLine(chalk.yellow(message));
}

export default printWarningLine;
