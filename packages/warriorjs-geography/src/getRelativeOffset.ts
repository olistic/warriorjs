import verifyAbsoluteDirection from './verifyAbsoluteDirection.js';
import { EAST, NORTH, SOUTH } from './absoluteDirections.js';

/**
 * Returns the relative offset for a given location, with reference to another
 * location (reference location) and direction (reference direction).
 *
 * @param {number[]} location The location.
 * @param {number[]} referenceLocation The reference location.
 * @param {string} referenceDirection The reference direction (absolute).
 *
 * @returns {number[]} The relative offset as [forward, right].
 */
function getRelativeOffset([x1, y1]: [number, number], [x2, y2]: [number, number], referenceDirection: string): [number, number] {
  verifyAbsoluteDirection(referenceDirection);

  const [deltaX, deltaY] = [x1 - x2, y1 - y2];

  if (referenceDirection === NORTH) {
    return [-deltaY, deltaX];
  }

  if (referenceDirection === EAST) {
    return [deltaX, deltaY];
  }

  if (referenceDirection === SOUTH) {
    return [deltaY, -deltaX];
  }

  return [-deltaX, -deltaY];
}

export default getRelativeOffset;
