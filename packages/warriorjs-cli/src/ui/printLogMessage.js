import chalk from 'chalk';

import getUnitStyle from './getUnitStyle';
import printLine from './printLine';

/**
 * Prints a message to the log.
 *
 * @param {Object} unit The unit the message belongs to.
 * @param {string} unit.name The name of the unit.
 * @param {string} message The message to print.
 */
function printLogMessage({ name }, message) {
  const prompt = chalk.gray.dim('>');
  const style = getUnitStyle(name);
  const logMessage = style(`${name} ${message}`);
  printLine(`${prompt} ${logMessage}`);
}

export default printLogMessage;
