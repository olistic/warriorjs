import getGradeLetter from '@warriorjs/helper-get-grade-letter';

import printLevelReport from './printLevelReport';
import printLine from './printLine';
import printTotalScore from './printTotalScore';

jest.mock('@warriorjs/helper-get-grade-letter');
jest.mock('./printLine');
jest.mock('./printTotalScore');

const profile = {
  currentEpicScore: 2,
  score: 3,
  isEpic: () => false,
};

const score = {
  parts: {
    warrior: 3,
    timeBonus: 2,
    clearBonus: 0,
  },
  total: 5,
  grade: 0.9,
};

test('prints level score', () => {
  printLevelReport(profile, score);
  expect(printLine).toHaveBeenCalledWith('Warrior Score: 3');
  expect(printLine).toHaveBeenCalledWith('Time Bonus: 2');
  expect(printLine).toHaveBeenCalledWith('Clear Bonus: 0');
});

test('prints regular score if not epic', () => {
  printLevelReport(profile, score);
  expect(printTotalScore).toHaveBeenCalledWith(3, 5);
});

describe('epic', () => {
  beforeEach(() => {
    profile.isEpic = () => true;
  });

  test('prints epic score', () => {
    printLevelReport(profile, score);
    expect(printTotalScore).toHaveBeenCalledWith(2, 5);
  });

  test('prints level grade', () => {
    getGradeLetter.mockReturnValue('A');
    printLevelReport(profile, score);
    expect(printLine).toHaveBeenCalledWith('Level Grade: A');
    expect(getGradeLetter).toHaveBeenCalledWith(0.9);
  });
});
