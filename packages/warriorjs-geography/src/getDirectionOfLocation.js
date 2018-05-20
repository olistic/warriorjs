import { EAST, NORTH, SOUTH, WEST } from './absoluteDirections';

/**
 * Returns the direction of a location from another location (reference
 * location).
 *
 * @param {number[]} location The location as [x, y].
 * @param {number[]} referenceLocation The reference location as [x, y].
 *
 * @returns {string} The direction.
 */
function getDirectionOfLocation([x1, y1], [x2, y2]) {
  if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
    if (x1 > x2) {
      return EAST;
    }

    return WEST;
  }

  if (y1 > y2) {
    return SOUTH;
  }

  return NORTH;
}

export default getDirectionOfLocation;
