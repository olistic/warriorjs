import { ABSOLUTE_DIRECTIONS } from './absoluteDirections';
import { RELATIVE_DIRECTIONS } from './relativeDirections';
import verifyAbsoluteDirection from './verifyAbsoluteDirection';
import verifyRelativeDirection from './verifyRelativeDirection';

/**
 * Returns the absolute direction for a given relative direction with reference
 * to a given orientation.
 *
 * @param {string} direction The relative direction.
 * @param {string} orientation The orientation (absolute direction).
 *
 * @returns {string} The absolute direction.
 */
function getAbsoluteDirection(direction, orientation) {
  verifyRelativeDirection(direction);
  verifyAbsoluteDirection(orientation);

  const index =
    (ABSOLUTE_DIRECTIONS.indexOf(orientation) +
      RELATIVE_DIRECTIONS.indexOf(direction)) %
    4;
  return ABSOLUTE_DIRECTIONS[index];
}

export default getAbsoluteDirection;
