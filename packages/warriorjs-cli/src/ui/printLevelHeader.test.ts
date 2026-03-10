import { test, expect, vi } from 'vitest';
import chalk from 'chalk';

import printRow from './printRow.js';
import printLevelHeader from './printLevelHeader.js';

vi.mock('./printRow.js');

test('prints level header', () => {
  printLevelHeader(1);
  expect(printRow).toHaveBeenCalledWith(
    chalk.gray.dim(' level 1 '),
    {
      position: 'middle',
      padding: chalk.gray.dim('~'),
    },
  );
});
