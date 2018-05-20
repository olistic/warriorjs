import verifyAbsoluteDirection from './verifyAbsoluteDirection';
import { EAST, NORTH, SOUTH } from './absoluteDirections';

/**
 * Returns the absolute offset for a given relative offset with reference
 * to a given direction (reference direction).
 *
 * @param {number[]} offset The relative offset as [forward, right].
 * @param {string} referenceDirection The reference direction (absolute).
 *
 * @returns {number[]} The absolute offset as [deltaX, deltaY].
 */
function getAbsoluteOffset([forward, right], referenceDirection) {
  verifyAbsoluteDirection(referenceDirection);

  if (referenceDirection === NORTH) {
    return [right, -forward];
  } else if (referenceDirection === EAST) {
    return [forward, right];
  } else if (referenceDirection === SOUTH) {
    return [-right, forward];
  }

  return [-forward, -right];
}

export default getAbsoluteOffset;
