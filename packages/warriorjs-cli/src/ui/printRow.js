import stringWidth from 'string-width';

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
  const rowWidth = screenWidth - 1; // Consider line break length.
  const messageWidth = stringWidth(message);
  const paddingWidth = (rowWidth - messageWidth) / 2;
  const startPadding = padding.repeat(Math.floor(paddingWidth));
  const endPadding = padding.repeat(Math.ceil(paddingWidth));
  if (position === 'start') {
    printLine(`${message}${startPadding}${endPadding}`);
  } else if (position === 'middle') {
    printLine(`${startPadding}${message}${endPadding}`);
  } else if (position === 'end') {
    printLine(`${startPadding}${endPadding}${message}`);
  }
}

export default printRow;
