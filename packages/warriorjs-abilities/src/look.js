import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function look({ range }) {
  return unit => ({
    description: `Returns an array of up to ${range} spaces in the given direction (${defaultDirection} by default).`,
    perform(direction = defaultDirection) {
      const offsets = Array.from(new Array(range), (_, index) => index + 1);
      const sensedSpaces = [];
      offsets
        .map(offset => unit.getSensedSpaceAt(direction, offset))
        .some(space => {
          sensedSpaces.push(space);
          return space && space.isWall && space.isWall();
        });
      return sensedSpaces;
    },
  });
}

export default look;
