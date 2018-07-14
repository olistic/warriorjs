/**
 * Checks if the floor is clear.
 *
 * The floor is clear when there are no units other than the warrior.
 *
 * @returns {boolean} Whether the floor is clear or not.
 */
function isFloorClear(floorMap) {
  const spaces = floorMap.reduce((acc, val) => acc.concat(val), []);
  const unitCount = spaces.filter(space => !!space.unit).length;
  return unitCount <= 1;
}

export default isFloorClear;
