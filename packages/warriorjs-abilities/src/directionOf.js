import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/geography';

function directionOf() {
  return unit => ({
    description: `Return the direction (${FORWARD}, ${RIGHT}, ${BACKWARD} or ${LEFT}) to the given space.`,
    perform(space) {
      return unit.getDirectionOf(space);
    },
  });
}

export default directionOf;
