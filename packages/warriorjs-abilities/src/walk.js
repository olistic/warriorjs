import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function walk() {
  return unit => ({
    action: true,
    description: `Move one space in the given direction (${defaultDirection} by default).`,
    perform(direction = defaultDirection) {
      unit.log(`walks ${direction}`);
      const space = unit.getSpaceAt(direction);
      if (space.isEmpty()) {
        unit.move(direction);
      } else {
        unit.log(`bumps into ${space}`);
      }
    },
  });
}

export default walk;
