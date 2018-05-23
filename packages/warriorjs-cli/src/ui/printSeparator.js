import chalk from 'chalk';

import printRow from './printRow';

/**
 * Prints a separator row.
 */
function printSeparator() {
  printRow('', {
    padding: chalk.gray.dim('~'),
  });
}

export default printSeparator;
