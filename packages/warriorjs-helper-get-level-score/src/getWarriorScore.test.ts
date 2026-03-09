import { test, expect, vi } from 'vitest';
import getLastEvent from './getLastEvent.js';
import getWarriorScore from './getWarriorScore.js';

vi.mock('./getLastEvent.js');

test('returns the score of the warrior at the end of the play', () => {
  vi.mocked(getLastEvent).mockReturnValue({ warriorStatus: { score: 42 } });
  expect(getWarriorScore([['events']] as unknown[][])).toBe(42);
  expect(getLastEvent).toHaveBeenCalledWith([['events']]);
});
