import { FORWARD } from '@warriorjs/geography';

const defaultDirection = FORWARD;

function bind() {
  return unit => ({
    action: true,
    description: `Bind a unit in the given direction (${defaultDirection} by default) to keep him from moving.`,
    perform(direction = defaultDirection) {
      const receiver = unit.getSpaceAt(direction).getUnit();
      if (receiver) {
        unit.log(`binds ${direction} and restricts ${receiver}`);
        receiver.bind();
      } else {
        unit.log(`binds ${direction} and restricts nothing`);
      }
    },
  });
}

export default bind;
