import chalk from 'chalk';

import constructSeperator from '../constructors/constructSeperator';

/**
 * Construct a seperator.
 */
function seperator() {
  const header = constructSeperator(this.screen.width);
  return chalk.gray.dim(header);
}

export default seperator;
