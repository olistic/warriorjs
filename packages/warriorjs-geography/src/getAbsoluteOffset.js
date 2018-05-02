import { EAST, NORTH, SOUTH } from './absoluteDirections';
import verifyAbsoluteDirection from './verifyAbsoluteDirection';

/**
 * Returns the absolute offset for a given relative offset with reference
 * to a given orientation.
 *
 * @param {number[]} offset The relative offset as [forward, right].
 * @param {string} orientation The orientation (absolute direction).
 *
 * @returns {number[]} The absolute offset as [deltaX, deltaY].
 */
function getAbsoluteOffset([forward, right], orientation) {
  verifyAbsoluteDirection(orientation);

  if (orientation === NORTH) {
    return [right, -forward];
  } else if (orientation === EAST) {
    return [forward, right];
  } else if (orientation === SOUTH) {
    return [-right, forward];
  }

  return [-forward, -right];
}

export default getAbsoluteOffset;
