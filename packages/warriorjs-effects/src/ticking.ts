interface Unit {
  health: number;
  takeDamage(amount: number): void;
  log(message: string): void;
  getOtherUnits(): Unit[];
}

interface TickingEffect {
  time: number;
  description: string;
  passTurn(): void;
  trigger(): void;
}

function ticking({ time }: { time: number }): (unit: Unit) => TickingEffect {
  return (unit: Unit): TickingEffect => ({
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
      [...unit.getOtherUnits(), unit].forEach((anotherUnit: Unit) =>
        anotherUnit.takeDamage(anotherUnit.health),
      );
    },
  });
}

export default ticking;
