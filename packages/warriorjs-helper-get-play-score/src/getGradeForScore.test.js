import getGradeForScore from './getGradeForScore';

test('calculates score percentage of ace score', () => {
  expect(getGradeForScore(42, 100)).toBe(0.42);
});
