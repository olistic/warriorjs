import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function rescue() {
  return unit => ({
    action: true,
    description: `Rescue a captive from his chains (earning a reward) in the given direction (${defaultDirection} by default).`,
    perform(direction = defaultDirection) {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver && receiver.isBound()) {
        unit.say(`unbinds ${direction} and rescues ${receiver}`);
        receiver.unbind();
        if (receiver.isFriendly()) {
          receiver.vanish();
          unit.earnPoints(receiver.reward);
        }
      } else {
        unit.say(`unbinds ${direction} and rescues nothing`);
      }
    },
  });
}

export default rescue;
