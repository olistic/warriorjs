import chalk from 'chalk';

/**
 * Construct a seperator.
 */
function success(message) {
  return `${chalk.gray.dim('>')} ${chalk.red(message)}`;
}

export default success;
