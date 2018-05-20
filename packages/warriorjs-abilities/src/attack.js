import { BACKWARD, FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function attack({ power }) {
  return unit => ({
    action: true,
    description: `Attack a unit in the given direction (${defaultDirection} by default) dealing ${power} HP of damage.`,
    perform(direction = defaultDirection) {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver) {
        unit.log(`attacks ${direction} and hits ${receiver}`);
        const attackingBackward = direction === BACKWARD;
        const amount = attackingBackward ? Math.ceil(power / 2.0) : power;
        unit.damage(receiver, amount);
      } else {
        unit.log(`attacks ${direction} and hits nothing`);
      }
    },
  });
}

export default attack;
