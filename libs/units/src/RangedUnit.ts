import { Unit } from '@warriorjs/core';
import { RELATIVE_DIRECTIONS } from '@warriorjs/spatial';

abstract class RangedUnit extends Unit {
  constructor(
    name: string,
    character: string,
    color: string,
    maxHealth: number,
    reward?: number | null,
  ) {
    super(name, character, color, maxHealth, reward);
    this.playTurn = (turn: any) => {
      const threatDirection = RELATIVE_DIRECTIONS.find((direction) => {
        const spaceWithUnit = turn.look(direction).find((space: any) => space.isUnit());
        return spaceWithUnit?.getUnit().isEnemy() && !spaceWithUnit.getUnit().isBound();
      });
      if (threatDirection) {
        turn.shoot(threatDirection);
      }
    };
  }
}

export default RangedUnit;
