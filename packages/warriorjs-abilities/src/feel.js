import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function feel() {
  return unit => ({
    description: `Returns the adjacent space in the given direction (\`'${defaultDirection}'\` by default).`,
    perform(direction = defaultDirection) {
      return unit.getSensedSpaceAt(direction);
    },
  });
}

export default feel;
