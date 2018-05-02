import getGradeForScore from './getGradeForScore';
import getGradeLetter from './getGradeLetter';

jest.mock('./getGradeLetter');

test('calls getGradeLetter with score percentage', () => {
  getGradeForScore(42, 100);
  expect(getGradeLetter.mock.calls[0][0]).toBe(0.42);
});
