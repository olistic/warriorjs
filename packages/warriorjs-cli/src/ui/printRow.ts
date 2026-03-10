import stringWidth from 'string-width';

import getScreenSize from './getScreenSize.js';
import printLine from './printLine.js';

interface PrintRowOptions {
  position?: string;
  padding?: string;
}

function printRow(message: string, { position = 'start', padding = ' ' }: PrintRowOptions = {}): void {
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
