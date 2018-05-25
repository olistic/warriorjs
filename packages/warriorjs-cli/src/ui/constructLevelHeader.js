import chalk from 'chalk';

import constructSeperator from './constructSeperator';

/**
 * Constructs the level header.
 *
 * @param {number} screenWidth  Width of the current screen
 * @param {number} levelNumber  The level number.
 */
function constructLevelHeader(screenWidth, levelNumber) {
  const header = constructSeperator(screenWidth, ` level ${levelNumber} `);
  return chalk.gray.dim(header);
}

export default constructLevelHeader;
