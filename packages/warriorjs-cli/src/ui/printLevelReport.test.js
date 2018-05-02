import getGradeForScore from '../utils/getGradeForScore';
import printLevelReport from './printLevelReport';
import printLine from './printLine';
import printTotalScore from './printTotalScore';

jest.mock('../utils/getGradeForScore');
jest.mock('./printLine');
jest.mock('./printTotalScore');

const profile = {
  currentEpicScore: 2,
  score: 3,
  isEpic: () => false,
};

test('prints level score', () => {
  printLevelReport(profile, { warriorScore: 3, timeBonus: 2, clearBonus: 0 });
  expect(printLine).toHaveBeenCalledWith('Warrior Score: 3');
  expect(printLine).toHaveBeenCalledWith('Time Bonus: 2');
  expect(printLine).toHaveBeenCalledWith('Clear Bonus: 0');
});

test('prints regular score if not epic', () => {
  printLevelReport(profile, { warriorScore: 3, timeBonus: 2, clearBonus: 0 });
  expect(printTotalScore).toHaveBeenCalledWith(3, 5);
});

test('prints epic score if epic', () => {
  profile.isEpic = () => true;
  printLevelReport(profile, { warriorScore: 3, timeBonus: 2, clearBonus: 0 });
  expect(printTotalScore).toHaveBeenCalledWith(2, 5);
});

test('prints level grade if epic and ace score', () => {
  profile.isEpic = () => true;
  getGradeForScore.mockReturnValue('A');
  printLevelReport(
    profile,
    { warriorScore: 3, timeBonus: 2, clearBonus: 0 },
    4,
  );
  expect(printLine).toHaveBeenCalledWith('Level Grade: A');
});
