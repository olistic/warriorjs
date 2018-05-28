import chalk from 'chalk';

/**
 * Construct a success message
 * @param  {String} message Message to be shown
 * @return {String}         Constructed message
 */
function success(message) {
  return `${chalk.gray.dim('>')} ${chalk.green(message)}`;
}

export default success;
