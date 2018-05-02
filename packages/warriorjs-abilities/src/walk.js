import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function walk() {
  return unit => ({
    action: true,
    description: `Move one space in the given direction (${defaultDirection} by default).`,
    perform(direction = defaultDirection) {
      unit.say(`walks ${direction}`);
      const space = unit.getSpaceAt(direction);
      if (space.isEmpty()) {
        unit.move(direction);
      } else {
        unit.say(`bumps into ${space}`);
      }
    },
  });
}

export default walk;
