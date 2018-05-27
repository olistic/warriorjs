import getUnitStyle from './getUnitStyle';

/**
 * Construct the floor map.
 *
 * @param {Object} map The map of the floor.
 */
function floorMap(map) {
  const content = map
    .map(row =>
      row
        .map(({ character, unit }) => {
          if (unit) {
            const style = getUnitStyle(unit);
            return style(character);
          }

          return character;
        })
        .join(''),
    )
    .join('\n');

  return content;
}

export default floorMap;
