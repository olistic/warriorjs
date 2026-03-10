import { test, expect, vi } from 'vitest';
import arrayShuffle from 'array-shuffle';

import getWarriorNameSuggestions from './getWarriorNameSuggestions.js';

vi.mock('array-shuffle');
vi.mock('superheroes', () => ({
  default: ['foo', 'bar'],
}));

test('returns shuffled list of warrior names', () => {
  getWarriorNameSuggestions();
  expect(arrayShuffle).toHaveBeenCalledWith(['foo', 'bar']);
});
