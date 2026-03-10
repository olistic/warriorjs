import chalk from 'chalk';
import { expect, test, vi } from 'vitest';

import printFailureLine from './printFailureLine.js';
import printLine from './printLine.js';

vi.mock('./printLine.js');

test('prints given line in red', () => {
  printFailureLine('foo');
  expect(printLine).toHaveBeenCalledWith(chalk.red('foo'));
});
