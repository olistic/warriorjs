import { attack, feel } from '@warriorjs/abilities';

import MeleeUnit from './MeleeUnit.js';

class ThickSludge extends MeleeUnit {
  declaredAbilities = {
    attack: attack.with({ power: 3 }),
    feel: feel,
  };

  constructor() {
    super('Thick Sludge', 'S', '#bf616a', 24);
  }
}

export default ThickSludge;
