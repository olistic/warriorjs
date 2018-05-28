import chalk from 'chalk';

/**
 * Construct a failure message
 * @param  {String} message Message to be shown
 * @return {String}         Constructed message
 */
function failure(message) {
  return `${chalk.gray.dim('>')} ${chalk.red(message)}`;
}

export default failure;
