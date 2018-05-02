import { ABSOLUTE_DIRECTIONS } from './absoluteDirections';
import { RELATIVE_DIRECTIONS } from './relativeDirections';
import verifyAbsoluteDirection from './verifyAbsoluteDirection';

/**
 * Returns the relative direction for a given absolute direction, with
 * reference to a given orientation.
 *
 * @param {string} direction The absolute direction.
 * @param {string} orientation The orientation (absolute direction).
 *
 * @returns {string} The relative direction.
 */
function getRelativeDirection(direction, orientation) {
  verifyAbsoluteDirection(direction);
  verifyAbsoluteDirection(orientation);

  const index =
    (ABSOLUTE_DIRECTIONS.indexOf(direction) -
      ABSOLUTE_DIRECTIONS.indexOf(orientation) +
      RELATIVE_DIRECTIONS.length) %
    RELATIVE_DIRECTIONS.length;
  return RELATIVE_DIRECTIONS[index];
}

export default getRelativeDirection;
