import chalk from 'chalk';

import printRow from './printRow.js';

function printSeparator(): void {
  printRow('', {
    padding: chalk.gray.dim('~'),
  });
}

export default printSeparator;
