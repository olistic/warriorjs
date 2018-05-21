import chalk from 'chalk';

import printRow from './printRow';

function printSeparator() {
  printRow('', {
    padding: chalk.gray('-'),
  });
}

export default printSeparator;
