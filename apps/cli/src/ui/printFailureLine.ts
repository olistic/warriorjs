import chalk from 'chalk';

import printLine from './printLine.js';

function printFailureLine(message: string): void {
  printLine(chalk.red(message));
}

export default printFailureLine;
