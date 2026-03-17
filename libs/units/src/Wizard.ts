import { Look, Shoot } from '@warriorjs/abilities';

import RangedUnit from './RangedUnit.js';

class Wizard extends RangedUnit {
  static declaredAbilities = {
    look: Look.with({ range: 3 }),
    shoot: Shoot.with({ range: 3, power: 11 }),
  };

  constructor() {
    super('Wizard', 'w', '#b48ead', 3);
  }
}

export default Wizard;
