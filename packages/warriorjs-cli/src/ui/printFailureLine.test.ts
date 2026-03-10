import { test, expect, vi } from 'vitest';
import chalk from 'chalk';

import printFailureLine from './printFailureLine.js';
import printLine from './printLine.js';

vi.mock('./printLine.js');

test('prints given line in red', () => {
  printFailureLine('foo');
  expect(printLine).toHaveBeenCalledWith(chalk.red('foo'));
});
