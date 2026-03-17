import { type Turn, Unit } from '@warriorjs/core';
import { RELATIVE_DIRECTIONS } from '@warriorjs/spatial';

abstract class MeleeUnit extends Unit {
  playTurn(turn: Turn) {
    const threatDirection = RELATIVE_DIRECTIONS.find((direction) => {
      const unit = turn.feel(direction).getUnit();
      return unit?.isEnemy() && !unit.isBound();
    });
    if (threatDirection) {
      turn.attack(threatDirection);
    }
  }
}

export default MeleeUnit;
