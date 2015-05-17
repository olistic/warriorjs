import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Health from '../../../src/abilities/Health';
import Warrior from '../../../src/units/Warrior';

chai.should();

describe('Health', () => {
  beforeEach((ctx) => {
    ctx.warrior = new Warrior();
    ctx.health = new Health(ctx.warrior);
  });

  it('should return the amount of health', (ctx) => {
    ctx.warrior.setHealth(10);
    ctx.health.perform().should.equal(10);
  });
});
