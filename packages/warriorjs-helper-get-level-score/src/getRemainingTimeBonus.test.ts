import { test, expect, vi } from 'vitest';
import getRemainingTimeBonus from './getRemainingTimeBonus.js';
import getTurnCount from './getTurnCount.js';

vi.mock('./getTurnCount.js');

test('subtracts the number of turns played from the initial time bonus', () => {
  vi.mocked(getTurnCount).mockReturnValue(3);
  expect(getRemainingTimeBonus([['events']] as unknown[][], 10)).toBe(7);
  expect(getTurnCount).toHaveBeenCalledWith([['events']]);
});

test("doesn't go below zero", () => {
  vi.mocked(getTurnCount).mockReturnValue(11);
  expect(getRemainingTimeBonus([['events']] as unknown[][], 10)).toBe(0);
  expect(getTurnCount).toHaveBeenCalledWith([['events']]);
});
