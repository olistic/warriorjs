import { ABSOLUTE_DIRECTIONS, EAST, NORTH, SOUTH, WEST } from './absoluteDirections.js';

/**
 * Checks if the given direction is a valid absolute direction.
 *
 * @param {string} direction The direction.
 *
 * @throws Will throw if the direction is not valid.
 */
function verifyAbsoluteDirection(direction: string): void {
  if (!(ABSOLUTE_DIRECTIONS as readonly string[]).includes(direction)) {
    throw new Error(
      `Unknown direction: '${direction}'. Should be one of: '${NORTH}', '${EAST}', '${SOUTH}' or '${WEST}'.`,
    );
  }
}

export default verifyAbsoluteDirection;
