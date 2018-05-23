import chalk from 'chalk';

import printRow from './printRow';

function printWelcomeHeader() {
  printRow(chalk.gray.dim('+*+~~~+*$#$*+~~~+*+'), {
    position: 'middle',
    padding: chalk.gray.dim('~'),
  });
  printRow(chalk.cyan('Welcome to WarriorJS!'), {
    position: 'middle',
  });
  printRow(chalk.gray.dim('+*+~~~+*$#$*+~~~+*+'), {
    position: 'middle',
    padding: chalk.gray.dim('~'),
  });
}

export default printWelcomeHeader;
