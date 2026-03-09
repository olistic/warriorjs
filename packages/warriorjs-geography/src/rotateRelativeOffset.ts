import verifyRelativeDirection from './verifyRelativeDirection.js';
import { BACKWARD, FORWARD, RIGHT } from './relativeDirections.js';

/**
 * Rotates the given relative offset in the given direction.
 *
 * @param {number[]} offset The relative offset as [forward, right].
 * @param {string} direction The direction (relative direction).
 *
 * @returns {number[]} The rotated offset as [forward, right].
 */
function rotateRelativeOffset([forward, right]: [number, number], direction: string): [number, number] {
  verifyRelativeDirection(direction);

  if (direction === FORWARD) {
    return [forward, right];
  }

  if (direction === RIGHT) {
    return [-right, forward];
  }

  if (direction === BACKWARD) {
    return [-forward, -right];
  }

  return [right, -forward];
}

export default rotateRelativeOffset;
