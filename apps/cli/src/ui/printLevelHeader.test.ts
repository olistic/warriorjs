import chalk from 'chalk';
import { expect, test, vi } from 'vitest';
import printLevelHeader from './printLevelHeader.js';
import printRow from './printRow.js';

vi.mock('./printRow.js');

test('prints level header', () => {
  printLevelHeader(1);
  expect(printRow).toHaveBeenCalledWith(chalk.gray.dim(' level 1 '), {
    position: 'middle',
    padding: chalk.gray.dim('~'),
  });
});
