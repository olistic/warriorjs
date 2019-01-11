import { BACKWARD } from '@warriorjs/geography';

const defaultDirection = BACKWARD;

function pivot() {
  return unit => ({
    action: true,
    argumentsDescription: `direction = '${defaultDirection}'`,
    description: `Rotates in the given direction (${defaultDirection} by default).`,
    perform(direction = defaultDirection) {
      unit.rotate(direction);
      unit.log(`pivots ${direction}`);
    },
  });
}

export default pivot;
