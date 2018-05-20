import { FORWARD, getRelativeOffset } from '@warriorjs/geography';

function listen() {
  return unit => ({
    description:
      'Return an array of all spaces which have units in them (excluding yourself).',
    perform() {
      return unit
        .getOtherUnits()
        .map(anotherUnit =>
          getRelativeOffset(
            anotherUnit.getSpace().location,
            unit.position.location,
            unit.position.orientation,
          ),
        )
        .map(([forward, right]) =>
          unit.getSensedSpaceAt(FORWARD, forward, right),
        );
    },
  });
}

export default listen;
