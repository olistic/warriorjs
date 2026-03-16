import { attack, feel } from '@warriorjs/abilities';

import MeleeUnit from './MeleeUnit.js';

class Sludge extends MeleeUnit {
  declaredAbilities = {
    attack: attack.with({ power: 3 }),
    feel: feel,
  };

  constructor() {
    super('Sludge', 's', '#d08770', 12);
  }
}

export default Sludge;
