/**
 * Construct a text seperator
 * @param  {Number} screenWidth Width of screen
 * @param  {String} message     Message that could be shown in the middle of the seperator
 * @param  {String} char        Character used in seperator
 * @return {String}             Returns the seperator
 */
function constructSeperator(screenWidth, message, char = '~') {
  const rowWidth = screenWidth - 1; // Consider line break length.

  if (!message) {
    return char.repeat(rowWidth);
  }

  const paddingLength = (rowWidth - message.length) / 2;
  const paddingSide = char.repeat(paddingLength);
  const seperator = paddingSide + message + paddingSide;

  return seperator;
}

export default constructSeperator;
