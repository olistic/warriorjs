import { type Turn, Unit } from '@warriorjs/core';
import { RELATIVE_DIRECTIONS } from '@warriorjs/spatial';

abstract class RangedUnit extends Unit {
  playTurn(turn: Turn) {
    const threatDirection = RELATIVE_DIRECTIONS.find((direction) => {
      const spaceWithUnit = turn.look(direction).find((space: any) => space.isUnit());
      return spaceWithUnit?.getUnit().isEnemy() && !spaceWithUnit.getUnit().isBound();
    });
    if (threatDirection) {
      turn.shoot(threatDirection);
    }
  }
}

export default RangedUnit;
