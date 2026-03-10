import getUnitStyle from './getUnitStyle.js';
import printLine from './printLine.js';

interface FloorSpace {
  character: string;
  unit?: { color: string; [key: string]: unknown };
}

function printFloorMap(floorMap: FloorSpace[][]): void {
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
