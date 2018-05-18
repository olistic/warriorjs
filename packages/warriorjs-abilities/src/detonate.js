import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;
const surroundingOffsets = [[1, 1], [1, -1], [2, 0], [0, 0]];

function detonate({ targetPower, surroundingPower }) {
  return unit => ({
    action: true,
    description: `Detonate a bomb in a given direction (${defaultDirection} by default) dealing ${targetPower} HP of damage to that space and ${surroundingPower} HP of damage to surrounding 4 spaces (including yourself).`,
    perform(direction = defaultDirection) {
      unit.log(`detonates a bomb ${direction} launching a deadly explosion`);
      const targetSpace = unit.getSpaceAt(direction);
      this.bomb(targetSpace, targetPower);
      surroundingOffsets
        .map(([forward, right]) => unit.getSpaceAt(direction, forward, right))
        .forEach(surroundingSpace => {
          this.bomb(surroundingSpace, surroundingPower);
        });
    },
    bomb(space, power) {
      const receiver = space.getUnit();
      if (receiver) {
        unit.damage(receiver, power);
        if (receiver.isUnderEffect('ticking')) {
          receiver.log(
            "caught in bomb's flames which detonates ticking explosive",
          );
          receiver.triggerEffect('ticking');
        }
      }
    },
  });
}

export default detonate;
