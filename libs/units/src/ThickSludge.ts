import { Attack, Feel } from '@warriorjs/abilities';

import MeleeUnit from './MeleeUnit.js';

class ThickSludge extends MeleeUnit {
  static declaredAbilities = {
    attack: Attack.with({ power: 3 }),
    feel: Feel,
  };

  constructor() {
    super('Thick Sludge', 'S', '#bf616a', 24);
  }
}

export default ThickSludge;
