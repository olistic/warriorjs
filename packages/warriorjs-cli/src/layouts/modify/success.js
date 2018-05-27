import chalk from 'chalk';

/**
 * Construct a seperator.
 */
function success(message) {
  return `${chalk.gray.dim('>')} ${chalk.green(message)}`;
}

export default success;
