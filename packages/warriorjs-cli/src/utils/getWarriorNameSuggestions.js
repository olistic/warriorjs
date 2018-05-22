import arrayShuffle from 'array-shuffle';
import superheroes from 'superheroes';

function getWarriorNameSuggestions() {
  return arrayShuffle(superheroes.all);
}

export default getWarriorNameSuggestions;
