import { expect, test } from 'vitest';
import getTurnCount from './getTurnCount.js';

test('returns the number of turns played', () => {
  const events = [['turn1'], ['turn2'], ['turn3']];
  expect(getTurnCount(events)).toBe(3);
});
