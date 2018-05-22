import arrayShuffle from 'array-shuffle';

import getWarriorNameSuggestions from './getWarriorNameSuggestions';

jest.mock('array-shuffle');
jest.mock('superheroes', () => ({
  all: ['foo', 'bar'],
}));

test('returns shuffled list of warrior names', () => {
  getWarriorNameSuggestions();
  expect(arrayShuffle).toHaveBeenCalledWith(['foo', 'bar']);
});
