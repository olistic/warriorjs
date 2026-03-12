import printFloorMap from './printFloorMap.js';
import printLevelHeader from './printLevelHeader.js';

interface Level {
  number: number;
  floorMap: any;
}

function printLevel({ number, floorMap }: Level): void {
  printLevelHeader(number);
  printFloorMap(floorMap);
}

export default printLevel;
