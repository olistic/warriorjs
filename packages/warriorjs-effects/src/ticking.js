function ticking({ time }) {
  return unit => ({
    time,
    description: 'Kills you and all surrounding units when time reaches zero.',
    passTurn() {
      if (this.time) {
        this.time -= 1;
      }

      unit.log('is ticking');

      if (!this.time) {
        this.trigger();
      }
    },
    trigger() {
      unit.log('explodes, collapsing the ceiling and killing every unit');
      [...unit.getOtherUnits(), unit].forEach(anotherUnit =>
        anotherUnit.takeDamage(anotherUnit.health),
      );
    },
  });
}

export default ticking;
