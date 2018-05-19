import verifyAbsoluteDirection from './verifyAbsoluteDirection';
import verifyRelativeDirection from './verifyRelativeDirection';
import { ABSOLUTE_DIRECTIONS } from './absoluteDirections';
import { RELATIVE_DIRECTIONS } from './relativeDirections';

/**
 * Returns the absolute direction for a given direction, with reference to
 * another direction (reference direction).
 *
 * @param {string} direction The direction (relative).
 * @param {string} referenceDirection The reference direction (absolute).
 *
 * @returns {string} The absolute direction.
 */
function getAbsoluteDirection(direction, referenceDirection) {
  verifyRelativeDirection(direction);
  verifyAbsoluteDirection(referenceDirection);

  const index =
    (ABSOLUTE_DIRECTIONS.indexOf(referenceDirection) +
      RELATIVE_DIRECTIONS.indexOf(direction)) %
    4;
  return ABSOLUTE_DIRECTIONS[index];
}

export default getAbsoluteDirection;
