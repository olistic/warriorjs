import { Look, Shoot } from '@warriorjs/abilities';

import RangedUnit from './RangedUnit.js';

class Archer extends RangedUnit {
  static declaredAbilities = {
    look: Look.with({ range: 3 }),
    shoot: Shoot.with({ range: 3, power: 3 }),
  };

  constructor() {
    super('Archer', 'a', '#ebcb8b', 7);
  }
}

export default Archer;
