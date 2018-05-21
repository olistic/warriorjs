import chalk from 'chalk';

import getUnitStyle from './getUnitStyle';
import printLine from './printLine';

/**
 * Prints a message to the log.
 *
 * @param {Object} unit The unit the message belongs to.
 * @param {string} message The message to print.
 */
function printLogMessage(unit, message) {
  const prompt = chalk.gray.dim('>');
  const logMessage = getUnitStyle(unit)(`${unit.name} ${message}`);
  printLine(`${prompt} ${logMessage}`);
}

export default printLogMessage;
