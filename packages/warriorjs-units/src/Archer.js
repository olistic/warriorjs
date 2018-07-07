import { RELATIVE_DIRECTIONS } from '@warriorjs/geography';
import { look, shoot } from '@warriorjs/abilities';

const Archer = {
  name: 'Archer',
  character: 'a',
  color: '#ebcb8b',
  maxHealth: 7,
  abilities: {
    look: look({ range: 3 }),
    shoot: shoot({ range: 3, power: 3 }),
  },
  playTurn(archer) {
    const threatDirection = RELATIVE_DIRECTIONS.find(direction => {
      const spaceWithUnit = archer
        .look(direction)
        .find(space => space.isUnit());
      return (
        spaceWithUnit &&
        spaceWithUnit.getUnit().isEnemy() &&
        !spaceWithUnit.getUnit().isBound()
      );
    });
    if (threatDirection) {
      archer.shoot(threatDirection);
    }
  },
};

export default Archer;
