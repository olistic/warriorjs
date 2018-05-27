import chalk from 'chalk';

/**
 * Construct a seperator.
 */
function success(message) {
  return chalk.red(message);
}

export default success;
