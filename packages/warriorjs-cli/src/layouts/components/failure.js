import chalk from 'chalk';

/**
 * Construct a failure seperator.
 */
function failure(message) {
  return `${chalk.gray.dim('>')} ${chalk.red(message)}`;
}

export default failure;
