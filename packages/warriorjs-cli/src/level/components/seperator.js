import chalk from 'chalk';

import constructSeperator from './constructSeperator';

/**
 * Construct a seperator.
 * @return {String}         Constructed seperator
 */
function seperator() {
  const header = constructSeperator(this.screen.width);
  return chalk.gray.dim(header);
}

export default seperator;
