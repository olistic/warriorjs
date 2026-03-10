import chalk from 'chalk';
import { expect, test, vi } from 'vitest';

import printRow from './printRow.js';
import printWelcomeHeader from './printWelcomeHeader.js';

vi.mock('./printRow.js');

test('prints welcome header', () => {
  printWelcomeHeader();
  expect(printRow).toHaveBeenCalledWith(chalk.gray.dim('+*+~~~+*$#$*+~~~+*+'), {
    position: 'middle',
    padding: chalk.gray.dim('~'),
  });
  expect(printRow).toHaveBeenCalledWith(chalk.cyan('Welcome to WarriorJS!'), {
    position: 'middle',
  });
});
