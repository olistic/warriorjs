import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function feel() {
  return unit => ({
    argumentsDescription: `direction = '${defaultDirection}'`,
    description: `Returns a \`Space\` object for the adjacent space in the given direction (${defaultDirection} by default).`,
    perform(direction = defaultDirection) {
      return unit.getSensedSpaceAt(direction);
    },
  });
}

export default feel;
