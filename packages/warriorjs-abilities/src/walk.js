import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function walk() {
  return unit => ({
    action: true,
    description: `Moves one space in the given direction (\`'${defaultDirection}'\` by default).`,
    perform(direction = defaultDirection) {
      const space = unit.getSpaceAt(direction);
      if (space.isEmpty()) {
        unit.move(direction);
        unit.log(`walks ${direction}`);
      } else {
        unit.log(`walks ${direction} and bumps into ${space}`);
      }
    },
  });
}

export default walk;
