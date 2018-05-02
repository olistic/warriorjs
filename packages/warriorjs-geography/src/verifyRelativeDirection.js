import {
  BACKWARD,
  FORWARD,
  LEFT,
  RELATIVE_DIRECTIONS,
  RIGHT,
} from './relativeDirections';

/**
 * Check if the given direction is a valid relative direction.
 *
 * @param {string} direction A relative direction.
 *
 * @throws Will throw if the direction is not valid.
 */
function verifyRelativeDirection(direction) {
  if (!RELATIVE_DIRECTIONS.includes(direction)) {
    throw new Error(
      `Unknown direction: '${direction}'. Should be one of: '${FORWARD}', '${RIGHT}', '${BACKWARD}' or '${LEFT}'.`,
    );
  }
}

export default verifyRelativeDirection;
