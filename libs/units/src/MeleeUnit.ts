import { Unit } from '@warriorjs/core';
import { RELATIVE_DIRECTIONS } from '@warriorjs/spatial';

abstract class MeleeUnit extends Unit {
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
        const unit = turn.feel(direction).getUnit();
        return unit?.isEnemy() && !unit.isBound();
      });
      if (threatDirection) {
        turn.attack(threatDirection);
      }
    };
  }
}

export default MeleeUnit;
