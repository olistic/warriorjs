interface FloorSpace {
  character: string;
  [key: string]: unknown;
}

function getFloorMap(map: FloorSpace[][]): string {
  return map.map((row) => row.map((space) => space.character).join('')).join('\n');
}

export default getFloorMap;
