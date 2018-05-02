function getFloorMapKey(map) {
  return map
    .reduce((acc, row) => acc.concat(row), [])
    .filter(space => space.stairs || space.unit)
    .filter(
      (space, index, arr) =>
        arr.findIndex(
          anotherSpace => anotherSpace.character === space.character,
        ) === index,
    )
    .map(({ character, stairs, unit }) => {
      if (stairs) {
        return `${character} = stairs`;
      }

      const { name, maxHealth } = unit;
      return `${character} = ${name} (${maxHealth} HP)`;
    })
    .join('\n');
}

export default getFloorMapKey;
