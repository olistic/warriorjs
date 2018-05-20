import chalk from 'chalk';

import printRow from './printRow';

/**
 * Prints the warrior status line.
 *
 * @param {Object} warrior The warrior.
 */
function printWarriorStatus(warrior) {
  const warriorHealth = chalk.redBright(`♥ ${warrior.health}`);
  printRow(warriorHealth);
  const warriorScore = chalk.yellowBright(`♦ ${warrior.score}`);
  printRow(warriorScore);
}

export default printWarriorStatus;
