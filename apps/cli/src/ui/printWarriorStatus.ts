import chalk from 'chalk';

import printRow from './printRow.js';

interface WarriorStatus {
  health: number;
  score: number;
}

function printWarriorStatus({ health, score }: WarriorStatus): void {
  printRow(chalk.redBright(`\u2665 ${health}`));
  printRow(chalk.yellowBright(`\u2666 ${score}`));
}

export default printWarriorStatus;
