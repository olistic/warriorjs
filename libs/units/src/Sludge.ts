import { Attack, Feel } from '@warriorjs/abilities';

import MeleeUnit from './MeleeUnit.js';

class Sludge extends MeleeUnit {
  declaredAbilities = {
    attack: Attack.with({ power: 3 }),
    feel: Feel,
  };

  constructor() {
    super('Sludge', 's', '#d08770', 12);
  }
}

export default Sludge;
