import verifyAbsoluteDirection from './verifyAbsoluteDirection';
import { ABSOLUTE_DIRECTIONS } from './absoluteDirections';
import { RELATIVE_DIRECTIONS } from './relativeDirections';

/**
 * Returns the relative direction for a given direction, with reference to a
 * another direction (reference direction).
 *
 * @param {string} direction The direction (absolute).
 * @param {string} referenceDirection The reference direction (absolute).
 *
 * @returns {string} The relative direction.
 */
function getRelativeDirection(direction, referenceDirection) {
  verifyAbsoluteDirection(direction);
  verifyAbsoluteDirection(referenceDirection);

  const index =
    (ABSOLUTE_DIRECTIONS.indexOf(direction) -
      ABSOLUTE_DIRECTIONS.indexOf(referenceDirection) +
      RELATIVE_DIRECTIONS.length) %
    RELATIVE_DIRECTIONS.length;
  return RELATIVE_DIRECTIONS[index];
}

export default getRelativeDirection;
