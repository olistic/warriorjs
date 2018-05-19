import chalk from 'chalk';

import printRow from './printRow';

/**
 * Prints the welcome header.
 *
 */
function printWelcomeHeader() {
  printRow('', 'center', chalk.gray('~'));
  printRow('#*~+--~.~--+~$#', 'center', chalk.gray('~'));
  printRow('* Welcome to WarriorJS! *', 'center', chalk.gray('~'));
  printRow('#$~+--~*~--+~*#', 'center', chalk.gray('~'));
  printRow('', 'center', chalk.gray('~'));
}

export default printWelcomeHeader;
