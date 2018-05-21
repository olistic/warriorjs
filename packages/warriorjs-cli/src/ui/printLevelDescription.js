import chalk from 'chalk';
import wrapAnsi from 'wrap-ansi';

import getScreenSize from './getScreenSize';
import printLine from './printLine';

function printLevelDescription(description) {
  const [screenWidth] = getScreenSize();
  printLine(wrapAnsi(chalk.italic(description), screenWidth, { hard: true }));
}

export default printLevelDescription;
