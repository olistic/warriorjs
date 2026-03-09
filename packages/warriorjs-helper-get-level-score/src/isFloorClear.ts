interface Space {
  unit?: unknown;
}

/**
 * Checks if the floor is clear.
 *
 * The floor is clear when there are no units other than the warrior.
 *
 * @param floorMap The floor map.
 * @returns Whether the floor is clear or not.
 */
function isFloorClear(floorMap: Space[][]): boolean {
  const spaces = floorMap.reduce<Space[]>((acc, val) => acc.concat(val), []);
  const unitCount = spaces.filter((space: Space) => !!space.unit).length;
  return unitCount <= 1;
}

export default isFloorClear;
