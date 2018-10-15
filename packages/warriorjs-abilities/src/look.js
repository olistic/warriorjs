import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function look({ range }) {
  return unit => ({
    argumentsDescription: `direction = '${defaultDirection}'`,
    description: `Returns an array of up to ${range} \`Space\`s in the given direction (${defaultDirection} by default).`,
    perform(direction = defaultDirection) {
      const offsets = Array.from(new Array(range), (_, index) => index + 1);
      const spaces = offsets.map(offset =>
        unit.getSensedSpaceAt(direction, offset),
      );
      const firstWallIndex = spaces.findIndex(space => space && space.isWall());
      return firstWallIndex === -1
        ? spaces
        : spaces.slice(0, firstWallIndex + 1);
    },
  });
}

export default look;
