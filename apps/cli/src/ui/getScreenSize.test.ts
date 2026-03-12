import { expect, test } from 'vitest';

import getScreenSize from './getScreenSize.js';

test('returns number of rows and columns from stdout', () => {
  process.stdout.columns = 4;
  process.stdout.rows = 2;
  expect(getScreenSize()).toEqual([4, 2]);
});
