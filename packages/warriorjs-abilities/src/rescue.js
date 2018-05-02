import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;
const rescuingReward = 20;

function rescue() {
  return unit => ({
    action: true,
    description: `Rescue a captive from his chains (earning ${rescuingReward} points) in the given direction (${defaultDirection} by default).`,
    perform(direction = defaultDirection) {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver && receiver.isBound()) {
        unit.say(`unbinds ${direction} and rescues ${receiver}`);
        receiver.unbind();
        if (receiver.isCaptive()) {
          receiver.vanish();
          unit.earnPoints(rescuingReward);
        }
      } else {
        unit.say(`unbinds ${direction} and rescues nothing`);
      }
    },
  });
}

export default rescue;
