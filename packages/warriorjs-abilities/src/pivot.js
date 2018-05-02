import { BACKWARD } from '@warriorjs/geography';

const defaultDirection = BACKWARD;

function pivot() {
  return unit => ({
    action: true,
    description: `Rotate in the given direction (${defaultDirection} by default).`,
    perform(direction = defaultDirection) {
      unit.say(`pivots ${direction}`);
      unit.rotate(direction);
    },
  });
}

export default pivot;
