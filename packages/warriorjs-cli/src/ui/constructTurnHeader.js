import chalk from 'chalk';

import constructSeperator from './constructSeperator';

/**
 * Construct a turn header.
 *
 * @param {number} screenWidth  Width of the current screen
 * @param {number} turnNumber   The turn number.
 */
function constructTurnHeader(screenWidth, turnNumber) {
  const header = constructSeperator(
    screenWidth,
    ` ${String(turnNumber).padStart(3, '0')} `,
  );
  return chalk.gray.dim(header);
}

export default constructTurnHeader;
