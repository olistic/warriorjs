import chalk from 'chalk';
import { expect, test, vi } from 'vitest';

import printLine from './printLine.js';
import printWarningLine from './printWarningLine.js';

vi.mock('./printLine.js');

test('prints given line in yellow', () => {
  printWarningLine('foo');
  expect(printLine).toHaveBeenCalledWith(chalk.yellow('foo'));
});
