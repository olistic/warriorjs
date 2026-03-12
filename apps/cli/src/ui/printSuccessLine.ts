import chalk from 'chalk';

import printLine from './printLine.js';

function printSuccessLine(message: string): void {
  printLine(chalk.green(message));
}

export default printSuccessLine;
