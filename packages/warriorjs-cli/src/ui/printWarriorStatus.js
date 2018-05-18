import chalk from 'chalk';

import getScreenSize from './getScreenSize';
import printLine from './printLine';
import isWindows from 'is-windows';

/**
 * Prints the warrior status line.
 *
 * @param {Object} warrior The warrior.
 */
function printWarriorStatus(warrior) {
  const [screenWidth] = getScreenSize();
  const warriorHealth = chalk.redBright(
    `♥ ${warrior.health}`.padEnd(screenWidth, ' '),
  );
  printLine(warriorHealth);

  const warriorScore = chalk.yellowBright(
    `${isWindows ? `♦` : `⬥`} ${warrior.score}`.padEnd(screenWidth, ' '),
  );
  printLine(warriorScore);
}

export default printWarriorStatus;
