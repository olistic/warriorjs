import chalk from 'chalk';

import printRow from './printRow.js';

function printLevelHeader(levelNumber: number): void {
  printRow(chalk.gray.dim(` level ${levelNumber} `), {
    position: 'middle',
    padding: chalk.gray.dim('~'),
  });
}

export default printLevelHeader;
