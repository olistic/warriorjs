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
