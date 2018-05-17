import chalk from 'chalk';

import printRow from './printRow';

/**
 * Prints the given header with the given padding.
 *
 * @param {string} header The header.
 * @param {string} paddingCharacter The padding character.
 */
function printHeader(header, paddingCharacter) {
  printRow(` ${header} `, 'center', chalk.gray(paddingCharacter));
}

export default printHeader;
