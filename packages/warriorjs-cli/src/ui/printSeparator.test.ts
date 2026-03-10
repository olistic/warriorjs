import { test, expect, vi } from 'vitest';
import chalk from 'chalk';

import printRow from './printRow.js';
import printSeparator from './printSeparator.js';

vi.mock('./printRow.js');

test('prints row of dimmed gray tildes', () => {
  printSeparator();
  expect(printRow).toHaveBeenCalledWith('', {
    padding: chalk.gray.dim('~'),
  });
});
