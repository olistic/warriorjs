import { RELATIVE_DIRECTIONS } from '@warriorjs/geography';
import { attack, feel } from '@warriorjs/abilities';

const Sludge = {
  name: 'Sludge',
  character: 's',
  color: '#d08770',
  maxHealth: 12,
  abilities: {
    attack: attack({ power: 3 }),
    feel: feel(),
  },
  playTurn(sludge) {
    const threatDirection = RELATIVE_DIRECTIONS.find(direction => {
      const unit = sludge.feel(direction).getUnit();
      return unit && unit.isEnemy() && !unit.isBound();
    });
    if (threatDirection) {
      sludge.attack(threatDirection);
    }
  },
};

export default Sludge;
