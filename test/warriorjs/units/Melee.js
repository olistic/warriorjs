import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Melee from '../../../src/units/Melee';

chai.should();

describe('Melee', () => {
  beforeEach((ctx) => {
    ctx.meleeUnit = new Melee();
  });

  it('should have feel sense', (ctx) => {
    ctx.meleeUnit.getSenses().should.include.key('feel');
  });
});
