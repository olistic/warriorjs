import chalk from 'chalk';
import { expect, test, vi } from 'vitest';

import printRow from './printRow.js';
import printWarriorStatus from './printWarriorStatus.js';

vi.mock('./printRow.js');

test('prints warrior health in bright red', () => {
  const warriorStatus = {
    health: 20,
    score: 0,
  };
  printWarriorStatus(warriorStatus);
  expect(printRow).toHaveBeenCalledWith(chalk.redBright('\u2665 20'));
});

test('prints warrior score in bright yellow', () => {
  const warriorStatus = {
    health: 0,
    score: 10,
  };
  printWarriorStatus(warriorStatus);
  expect(printRow).toHaveBeenCalledWith(chalk.yellowBright('\u2666 10'));
});
