import getScreenSize from './getScreenSize';
import printLine from './printLine';

/**
 * Prints a message and fills the rest of the line with a padding character.
 *
 * @param {string} message The message to print.
 * @param {string} align The message alignment.
 * @param {string} paddingCharacter The padding character.
 */
function printRow(message, align = 'left', paddingCharacter = ' ') {
  const [screenWidth] = getScreenSize();
  const rowLength = screenWidth - 1; // Consider line break length.
  const startPadding = paddingCharacter.repeat(
    Math.floor((rowLength - message.length) / 2),
  );
  const endPadding = paddingCharacter.repeat(
    Math.ceil((rowLength - message.length) / 2),
  );
  if (align === 'left') {
    printLine(`${message}${startPadding}${endPadding}`);
  } else if (align === 'center') {
    printLine(`${startPadding}${message}${endPadding}`);
  } else if (align === 'right') {
    printLine(`${startPadding}${endPadding}${message}`);
  }
}

export default printRow;
