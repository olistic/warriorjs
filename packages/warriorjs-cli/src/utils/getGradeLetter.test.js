import getGradeLetter from './getGradeLetter';

test('returns letter based on percentage', () => {
  expect(getGradeLetter(1.0)).toBe('S');
  expect(getGradeLetter(0.99)).toBe('A');
  expect(getGradeLetter(0.9)).toBe('A');
  expect(getGradeLetter(0.89)).toBe('B');
  expect(getGradeLetter(0.8)).toBe('B');
  expect(getGradeLetter(0.79)).toBe('C');
  expect(getGradeLetter(0.7)).toBe('C');
  expect(getGradeLetter(0.69)).toBe('D');
  expect(getGradeLetter(0.6)).toBe('D');
  expect(getGradeLetter(0.59)).toBe('F');
  expect(getGradeLetter(0)).toBe('F');
});
