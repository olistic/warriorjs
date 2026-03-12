import chalk from 'chalk';
import { expect, test, vi } from 'vitest';

import printRow from './printRow.js';
import printSeparator from './printSeparator.js';

vi.mock('./printRow.js');

test('prints row of dimmed gray tildes', () => {
  printSeparator();
  expect(printRow).toHaveBeenCalledWith('', {
    padding: chalk.gray.dim('~'),
  });
});
