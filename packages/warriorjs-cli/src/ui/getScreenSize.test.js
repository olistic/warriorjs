import getScreenSize from './getScreenSize';

test('returns number of rows and columns from stdout', () => {
  process.stdout.columns = 4;
  process.stdout.rows = 2;
  expect(getScreenSize()).toEqual([4, 2]);
});
