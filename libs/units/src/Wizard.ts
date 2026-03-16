import { look, shoot } from '@warriorjs/abilities';

import Archer from './Archer.js';

const Wizard = {
  ...Archer,
  name: 'Wizard',
  character: 'w',
  color: '#b48ead',
  maxHealth: 3,
  abilities: {
    look: look.with({ range: 3 }),
    shoot: shoot.with({ range: 3, power: 11 }),
  },
};

export default Wizard;
