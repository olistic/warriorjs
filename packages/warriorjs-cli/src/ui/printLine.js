import print from './print';

/**
 * Prints a message followed by a line-break.
 *
 * @param {string} message The message to print.
 */
function printLine(message) {
  print(`${message}\n`);
}

export default printLine;
