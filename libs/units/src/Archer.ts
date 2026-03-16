import { look, shoot } from '@warriorjs/abilities';

import RangedUnit from './RangedUnit.js';

class Archer extends RangedUnit {
  declaredAbilities = {
    look: look.with({ range: 3 }),
    shoot: shoot.with({ range: 3, power: 3 }),
  };

  constructor() {
    super('Archer', 'a', '#ebcb8b', 7);
  }
}

export default Archer;
