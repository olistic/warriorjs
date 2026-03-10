import { test, expect, vi } from 'vitest';
import chalk from 'chalk';

import printRow from './printRow.js';
import printTurnHeader from './printTurnHeader.js';

vi.mock('./printRow.js');

test('prints turn header', () => {
  printTurnHeader(1);
  expect(printRow).toHaveBeenCalledWith(
    chalk.gray.dim(' 001 '),
    {
      position: 'middle',
      padding: chalk.gray.dim('~'),
    },
  );
});
