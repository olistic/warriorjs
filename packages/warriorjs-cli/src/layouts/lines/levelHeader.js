import chalk from 'chalk';

import constructSeperator from './constructSeperator';

/**
 * Construct the level header.
 *
 * @param {number} screenWidth  Width of the current screen
 * @param {number} levelNumber  The level number.
 */
function levelHeader(levelNumber) {
  const header = constructSeperator(
    this.screen.width,
    ` level ${levelNumber} `,
  );
  return chalk.gray.dim(header);
}

export default levelHeader;
