import {
  ABSOLUTE_DIRECTIONS,
  EAST,
  NORTH,
  SOUTH,
  WEST,
} from './absoluteDirections';

/**
 * Check if the given direction is a valid cardinal direction.
 *
 * @param {string} direction A cardinal direction.
 *
 * @throws Will throw if the direction is not valid.
 */
function verifyAbsoluteDirection(direction) {
  if (!ABSOLUTE_DIRECTIONS.includes(direction)) {
    throw new Error(
      `Unknown direction: '${direction}'. Should be one of: '${NORTH}', '${EAST}', '${SOUTH}' or '${WEST}'.`,
    );
  }
}

export default verifyAbsoluteDirection;
