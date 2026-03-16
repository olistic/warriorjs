import { look, shoot } from '@warriorjs/abilities';

import RangedUnit from './RangedUnit.js';

class Wizard extends RangedUnit {
  declaredAbilities = {
    look: look.with({ range: 3 }),
    shoot: shoot.with({ range: 3, power: 11 }),
  };

  constructor() {
    super('Wizard', 'w', '#b48ead', 3);
  }
}

export default Wizard;
