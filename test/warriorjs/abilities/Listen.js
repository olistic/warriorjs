import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Listen from '../../../src/abilities/Listen';
import Base from '../../../src/units/Base';
import Warrior from '../../../src/units/Warrior';
import Floor from '../../../src/Floor';

chai.should();

describe('Listen', () => {
  beforeEach((ctx) => {
    ctx.floor = new Floor();
    ctx.floor.setWidth(2);
    ctx.floor.setHeight(3);
    ctx.warrior = new Warrior();
    ctx.floor.addUnit(ctx.warrior, 0, 0);
    ctx.listen = new Listen(ctx.warrior);
  });

  it('should return an array of spaces which have units on them besides main unit', (ctx) => {
    ctx.floor.addUnit(new Base(), 0, 1);
    ctx.listen.perform().should.have.length(1);
  });
});
