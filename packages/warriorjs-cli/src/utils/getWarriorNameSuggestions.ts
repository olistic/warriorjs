import arrayShuffle from 'array-shuffle';
import superheroes from 'superheroes';

function getWarriorNameSuggestions(): string[] {
  return arrayShuffle(superheroes as unknown as string[]);
}

export default getWarriorNameSuggestions;
