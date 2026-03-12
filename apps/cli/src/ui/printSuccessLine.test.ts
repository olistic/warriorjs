import chalk from 'chalk';
import { expect, test, vi } from 'vitest';

import printLine from './printLine.js';
import printSuccessLine from './printSuccessLine.js';

vi.mock('./printLine.js');

test('prints given line in green', () => {
  printSuccessLine('foo');
  expect(printLine).toHaveBeenCalledWith(chalk.green('foo'));
});
