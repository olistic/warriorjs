import chalk from 'chalk';

import getUnitStyle from './getUnitStyle';

/**
 * Prints a message to the log.
 *
 * @param {Object} unit The unit the message belongs to.
 * @param {string} message The message to print.
 */
function printLogMessage(unit, message) {
  const prompt = chalk.gray.dim('>');
  const style = getUnitStyle(unit);
  const logMessage = style(`${unit.name} ${message}`);
  return `${prompt} ${logMessage}`;
}

export default printLogMessage;
