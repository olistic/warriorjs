import { BACKWARD, FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function attack({ power }) {
  const backwardPower = Math.ceil(power / 2.0);
  return unit => ({
    action: true,
    argumentsDescription: `direction = '${defaultDirection}'`,
    description: `Attacks a unit in the given direction (${defaultDirection} by default), dealing ${power} HP of damage in any direction except backward (reduced to ${backwardPower} if attacking backward).`,
    perform(direction = defaultDirection) {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver) {
        unit.log(`attacks ${direction} and hits ${receiver}`);
        const attackingBackward = direction === BACKWARD;
        const amount = attackingBackward ? backwardPower : power;
        unit.damage(receiver, amount);
      } else {
        unit.log(`attacks ${direction} and hits nothing`);
      }
    },
  });
}

export default attack;
