import type { Unit } from './types.js';

function distanceOf() {
  return (unit: Unit) => ({
    description:
      'Returns an integer representing the distance to the given space.',
    perform(space: unknown) {
      return unit.getDistanceOf(space);
    },
  });
}

export default distanceOf;
