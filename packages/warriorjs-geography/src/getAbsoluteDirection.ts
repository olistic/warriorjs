import { ABSOLUTE_DIRECTIONS } from './absoluteDirections.js';
import { RELATIVE_DIRECTIONS } from './relativeDirections.js';
import verifyAbsoluteDirection from './verifyAbsoluteDirection.js';
import verifyRelativeDirection from './verifyRelativeDirection.js';

/**
 * Returns the absolute direction for a given direction, with reference to
 * another direction (reference direction).
 *
 * @param {string} direction The direction (relative).
 * @param {string} referenceDirection The reference direction (absolute).
 *
 * @returns {string} The absolute direction.
 */
function getAbsoluteDirection(direction: string, referenceDirection: string): string {
  verifyRelativeDirection(direction);
  verifyAbsoluteDirection(referenceDirection);

  const index =
    ((ABSOLUTE_DIRECTIONS as readonly string[]).indexOf(referenceDirection) +
      (RELATIVE_DIRECTIONS as readonly string[]).indexOf(direction)) %
    4;
  return ABSOLUTE_DIRECTIONS[index];
}

export default getAbsoluteDirection;
