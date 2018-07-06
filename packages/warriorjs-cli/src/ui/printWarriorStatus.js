import chalk from 'chalk';

import printRow from './printRow';

/**
 * Prints the warrior status line.
 *
 * @param {Object} warriorStatus The status of the warrior.
 * @param {number} warriorStatus.health The health of the warrior.
 * @param {number} warriorStatus.score The score of the warrior.
 */
function printWarriorStatus({ health, score }) {
  printRow(chalk.redBright(`♥ ${health}`));
  printRow(chalk.yellowBright(`♦ ${score}`));
}

export default printWarriorStatus;
