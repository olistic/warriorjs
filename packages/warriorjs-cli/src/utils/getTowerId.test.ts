import { expect, test } from 'vitest';

import getTowerId from './getTowerId.js';

test('returns the tower id for official towers', () => {
  expect(getTowerId('@warriorjs/tower-foo')).toBe('foo');
});

test('returns the tower id for community towers', () => {
  expect(getTowerId('warriorjs-tower-foo')).toBe('foo');
});
