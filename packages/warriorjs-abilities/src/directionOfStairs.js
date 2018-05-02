import { BACKWARD, FORWARD, LEFT, RIGHT } from '@warriorjs/geography';

function directionOfStairs() {
  return unit => ({
    description: `Return the direction (${FORWARD}, ${RIGHT}, ${BACKWARD} or ${LEFT}) the stairs are from your location.`,
    perform() {
      return unit.getDirectionOfStairs();
    },
  });
}

export default directionOfStairs;
