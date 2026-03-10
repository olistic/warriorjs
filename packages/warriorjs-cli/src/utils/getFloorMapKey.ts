interface FloorSpace {
  character: string;
  unit?: {
    name: string;
    maxHealth: number;
  };
}

function getFloorMapKey(map: FloorSpace[][]): string {
  return map
    .reduce<FloorSpace[]>((acc, row) => acc.concat(row), [])
    .filter((space) => space.unit)
    .filter(
      (space, index, arr) =>
        arr.findIndex((anotherSpace) => anotherSpace.character === space.character) === index,
    )
    .map(({ character, unit }) => {
      const { name, maxHealth } = unit!;
      return `${character} = ${name} (${maxHealth} HP)`;
    })
    .concat(['> = stairs'])
    .join('\n');
}

export default getFloorMapKey;
