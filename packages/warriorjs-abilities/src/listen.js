function listen() {
  return unit => ({
    description:
      'Return an array of all spaces which have units in them (excluding yourself).',
    perform() {
      return unit
        .getOtherUnits()
        .map(anotherUnit => anotherUnit.getSpace().toPlayerObject());
    },
  });
}

export default listen;
