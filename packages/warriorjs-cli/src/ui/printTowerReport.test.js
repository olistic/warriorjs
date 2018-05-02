import getGradeLetter from '../utils/getGradeLetter';
import printLine from './printLine';
import printTowerReport from './printTowerReport';

jest.mock('../utils/getGradeLetter');
jest.mock('./printLine');

test("doesn't print if no average grade", () => {
  const profile = { calculateAverageGrade: () => null };
  printTowerReport(profile);
  expect(printLine).not.toHaveBeenCalled();
});

test("prints tower's average grade and each level's grade", () => {
  getGradeLetter
    .mockReturnValueOnce('A')
    .mockReturnValueOnce('B')
    .mockReturnValueOnce('A');
  const profile = {
    currentEpicGrades: {
      2: 0.9,
      1: 0.8,
    },
    calculateAverageGrade: () => 0.9,
  };
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
