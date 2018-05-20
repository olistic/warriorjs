import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function shoot({ power, range }) {
  return unit => ({
    action: true,
    description: `Shoot your bow & arrow in the given direction (${defaultDirection} by default) dealing ${power} HP of damage to the first unit in a range of ${range} spaces.`,
    perform(direction = defaultDirection) {
      const offsets = Array.from(new Array(range), (_, index) => index + 1);
      const receiver = offsets
        .map(offset => unit.getSpaceAt(direction, offset).getUnit())
        .find(unitInRange => unitInRange);
      if (receiver) {
        unit.log(`shoots ${direction} and hits ${receiver}`);
        unit.damage(receiver, power);
      } else {
        unit.log(`shoots ${direction} and hits nothing`);
      }
    },
  });
}

export default shoot;
