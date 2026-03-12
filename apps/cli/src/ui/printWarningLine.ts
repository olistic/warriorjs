import chalk from 'chalk';

import printLine from './printLine.js';

function printWarningLine(message: string): void {
  printLine(chalk.yellow(message));
}

export default printWarningLine;
