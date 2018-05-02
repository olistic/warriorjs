import chalk from 'chalk';

import printLine from './printLine';

/**
 * Prints a message in color red followed by a line-break.
 *
 * @param {string} message The message to print.
 */
function printFailureLine(message) {
  printLine(chalk.red(message));
}

export default printFailureLine;
