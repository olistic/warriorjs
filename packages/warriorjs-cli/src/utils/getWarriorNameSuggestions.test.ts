import arrayShuffle from 'array-shuffle';
import { expect, test, vi } from 'vitest';

import getWarriorNameSuggestions from './getWarriorNameSuggestions.js';

vi.mock('array-shuffle');
vi.mock('superheroes', () => ({
  default: ['foo', 'bar'],
}));

test('returns shuffled list of warrior names', () => {
  getWarriorNameSuggestions();
  expect(arrayShuffle).toHaveBeenCalledWith(['foo', 'bar']);
});
