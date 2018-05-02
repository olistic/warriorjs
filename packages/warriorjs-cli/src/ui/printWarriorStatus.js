import chalk from 'chalk';

import getScreenSize from './getScreenSize';
import printLine from './printLine';

/**
 * Prints the warrior status line.
 *
 * @param {Object} warrior The warrior.
 */
function printWarriorStatus(warrior) {
  const [screenWidth] = getScreenSize();
  const warriorStatus = chalk.red(
    `♥ ${warrior.health}`.padEnd(screenWidth, ' '),
  );
  printLine(warriorStatus);
}

export default printWarriorStatus;
