import chalk from 'chalk';

import getUnitStyle from './getUnitStyle.js';
import printLine from './printLine.js';

interface Unit {
  name: string;
  color: string;
  [key: string]: unknown;
}

function printLogMessage(unit: Unit, message: string): void {
  const prompt = chalk.gray.dim('>');
  const logMessage = getUnitStyle(unit)(`${unit.name} ${message}`);
  printLine(`${prompt} ${logMessage}`);
}

export default printLogMessage;
