import verifyAbsoluteDirection from './verifyAbsoluteDirection.js';
import { ABSOLUTE_DIRECTIONS } from './absoluteDirections.js';
import { RELATIVE_DIRECTIONS } from './relativeDirections.js';

/**
 * Returns the relative direction for a given direction, with reference to a
 * another direction (reference direction).
 *
 * @param {string} direction The direction (absolute).
 * @param {string} referenceDirection The reference direction (absolute).
 *
 * @returns {string} The relative direction.
 */
function getRelativeDirection(direction: string, referenceDirection: string): string {
  verifyAbsoluteDirection(direction);
  verifyAbsoluteDirection(referenceDirection);

  const index =
    ((ABSOLUTE_DIRECTIONS as readonly string[]).indexOf(direction) -
      (ABSOLUTE_DIRECTIONS as readonly string[]).indexOf(referenceDirection) +
      RELATIVE_DIRECTIONS.length) %
    RELATIVE_DIRECTIONS.length;
  return RELATIVE_DIRECTIONS[index];
}

export default getRelativeDirection;
