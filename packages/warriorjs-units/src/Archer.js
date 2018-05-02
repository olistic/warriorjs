import { RELATIVE_DIRECTIONS } from '@warriorjs/geography';
import { look, shoot } from '@warriorjs/abilities';

const Archer = {
  name: 'Archer',
  character: 'a',
  maxHealth: 7,
  abilities: {
    look: look({ range: 3 }),
    shoot: shoot({ range: 3, power: 3 }),
  },
  playTurn(archer) {
    const playerDirection = RELATIVE_DIRECTIONS.find(direction => {
      const spaceWithUnit = archer
        .look(direction)
        .find(space => !space.isEmpty());
      return spaceWithUnit && spaceWithUnit.isPlayer();
    });
    if (playerDirection) {
      archer.shoot(playerDirection);
    }
  },
};

export default Archer;
