import printLine from './printLine';
import printTotalScore from './printTotalScore';

jest.mock('./printLine');

test('prints only addition if current score is zero', () => {
  printTotalScore(0, 42);
  expect(printLine).toHaveBeenCalledWith('Total Score: 42');
});

test('prints sum if current score is greater than zero', () => {
  printTotalScore(41, 1);
  expect(printLine).toHaveBeenCalledWith('Total Score: 41 + 1 = 42');
});
