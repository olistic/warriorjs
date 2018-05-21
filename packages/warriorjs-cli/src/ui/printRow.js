import getScreenSize from './getScreenSize';
import printLine from './printLine';

/**
 * Prints a message and fills the rest of the line with a padding character.
 *
 * @param {string} message The message to print.
 * @param {Object} options The options.
 * @param {string} options.position The position of the message.
 * @param {string} options.padding The padding character.
 */
function printRow(message, { position = 'start', padding = ' ' } = {}) {
  const [screenWidth] = getScreenSize();
  const rowLength = screenWidth - 1; // Consider line break length.
  const startPadding = padding.repeat(
    Math.floor((rowLength - message.length) / 2),
  );
  const endPadding = padding.repeat(
    Math.ceil((rowLength - message.length) / 2),
  );
  if (position === 'start') {
    printLine(`${message}${startPadding}${endPadding}`);
  } else if (position === 'middle') {
    printLine(`${startPadding}${message}${endPadding}`);
  } else if (position === 'end') {
    printLine(`${startPadding}${endPadding}${message}`);
  }
}

export default printRow;
