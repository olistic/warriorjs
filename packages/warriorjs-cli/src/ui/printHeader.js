import chalk from 'chalk';

import printRow from './printRow';

/**
 * Prints the given header.
 *
 * @param {string} header The header.
 */
function printHeader(header) {
  printRow(` ${header} `, 'center', chalk.gray('-'));
}

export default printHeader;
