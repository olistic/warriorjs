import chalk from 'chalk';

import constructSeperator from './constructSeperator';

/**
 * Construct a seperator.
 */
function seperator() {
  const header = constructSeperator(this.screen.width - 1);
  return chalk.gray.dim(header);
}

export default seperator;
