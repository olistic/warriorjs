import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Floor from '../../../src/Floor';
import Ranged from '../../../src/units/Ranged';
import Warrior from '../../../src/units/Warrior';

chai.should();

describe('Ranged', () => {
  beforeEach((ctx) => {
    ctx.rangedUnit = new Ranged();
    ctx.floor = new Floor();
    ctx.floor.setWidth(4);
    ctx.floor.setHeight(1);
    ctx.floor.addUnit(ctx.rangedUnit, 3, 0, 'west');
  });

  it('should have look sense', (ctx) => {
    ctx.rangedUnit.getSenses().should.include.key('look');
  });
});
