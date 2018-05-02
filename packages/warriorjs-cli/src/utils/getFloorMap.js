function getFloorMap(map) {
  return map.map(row => row.map(space => space.character).join('')).join('\n');
}

export default getFloorMap;
