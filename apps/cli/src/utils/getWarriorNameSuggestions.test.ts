import arrayShuffle from 'array-shuffle';
import { expect, test, vi } from 'vitest';

import getWarriorNameSuggestions from './getWarriorNameSuggestions.js';

vi.mock('array-shuffle');

test('returns shuffled list of warrior names', () => {
  getWarriorNameSuggestions();
  expect(arrayShuffle).toHaveBeenCalledWith(expect.arrayContaining(['Aldric', 'Brenna', 'Cedric']));
});
