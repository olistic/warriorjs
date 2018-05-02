import chalk from 'chalk';

import getScreenSize from './getScreenSize';
import printLine from './printLine';

/**
 * Prints the given header.
 *
 * @param {string} header The header.
 */
function printHeader(header) {
  const [screenWidth] = getScreenSize();
  const headerLength = header.length + 2; // 2 spaces surrounding the header.
  const paddingLength = (screenWidth - headerLength) / 2;
  const padding = chalk.gray('-'.repeat(paddingLength));
  printLine(`${padding} ${header} ${padding}`);
}

export default printHeader;
