import chalk from 'chalk';

import printRow from './printRow.js';

function printTurnHeader(turnNumber: number): void {
  printRow(chalk.gray.dim(` ${String(turnNumber).padStart(3, '0')} `), {
    position: 'middle',
    padding: chalk.gray.dim('~'),
  });
}

export default printTurnHeader;
