import verifyRelativeDirection from './verifyRelativeDirection';
import { BACKWARD, FORWARD, RIGHT } from './relativeDirections';

/**
 * Rotates the given relative offset in the given direction.
 *
 * @param {number[]} offset The relative offset as [forward, right].
 * @param {string} direction The direction (relative direction).
 *
 * @returns {number[]} The rotated offset as [forward, right].
 */
function rotateRelativeOffset([forward, right], direction) {
  verifyRelativeDirection(direction);

  if (direction === FORWARD) {
    return [forward, right];
  } else if (direction === RIGHT) {
    return [-right, forward];
  } else if (direction === BACKWARD) {
    return [-forward, -right];
  }

  return [right, -forward];
}

export default rotateRelativeOffset;
