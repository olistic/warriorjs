import getUnitStyle from './getUnitStyle';
import printLine from './printLine';

/**
 * Prints the floor map.
 *
 * @param {Object[][]} floorMap The map of the floor.
 */
function printFloorMap(floorMap) {
  printLine(
    floorMap
      .map(row =>
        row
          .map(({ character, unit }) => {
            if (unit) {
              return getUnitStyle(unit)(character);
            }

            return character;
          })
          .join(''),
      )
      .join('\n'),
  );
}

export default printFloorMap;
