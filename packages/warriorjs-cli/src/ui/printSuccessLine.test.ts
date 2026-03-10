import { test, expect, vi } from 'vitest';
import chalk from 'chalk';

import printLine from './printLine.js';
import printSuccessLine from './printSuccessLine.js';

vi.mock('./printLine.js');

test('prints given line in green', () => {
  printSuccessLine('foo');
  expect(printLine).toHaveBeenCalledWith(chalk.green('foo'));
});
