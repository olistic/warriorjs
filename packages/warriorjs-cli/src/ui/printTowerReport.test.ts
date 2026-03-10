import { test, expect, vi } from 'vitest';
import getGradeLetter from '@warriorjs/helper-get-grade-letter';

import printLine from './printLine.js';
import printTowerReport from './printTowerReport.js';

vi.mock('@warriorjs/helper-get-grade-letter');
vi.mock('./printLine.js');

test("doesn't print if no average grade", () => {
  const profile = { calculateAverageGrade: () => null } as any;
  printTowerReport(profile);
  expect(printLine).not.toHaveBeenCalled();
});

test("prints tower's average grade and each level's grade", () => {
  (getGradeLetter as any)
    .mockReturnValueOnce('A')
    .mockReturnValueOnce('B')
    .mockReturnValueOnce('A');
  const profile = {
    currentEpicGrades: {
      2: 0.9,
      1: 0.8,
    },
    calculateAverageGrade: () => 0.9,
  } as any;
  printTowerReport(profile);
  expect(printLine).toHaveBeenCalledWith(
    'Your average grade for this tower is: A\n',
  );
  expect(printLine).toHaveBeenCalledWith('  Level 1: B');
  expect(printLine).toHaveBeenCalledWith('  Level 2: A');
  expect(printLine).toHaveBeenCalledWith(
    '\nTo practice a level, use the -l option.',
  );
});
