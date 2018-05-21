import getUnitStyle from './getUnitStyle';
import printLine from './printLine';

/**
 * Prints the floor map.
 *
 * @param {Object} map The map of the floor.
 */
function printFloorMap(map) {
  const floorMap = map
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
  printLine(floorMap);
}

export default printFloorMap;
