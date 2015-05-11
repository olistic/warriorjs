import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Rest from '../../src/abilities/Rest';
import Warrior from '../../src/units/Warrior';

chai.should();

describe('Rest', () => {
  beforeEach((ctx) => {
    ctx.warrior = new Warrior();
    ctx.rest = new Rest(ctx.warrior);
  });

  it('should give 10% health back', (ctx) => {
    ctx.sandbox.stub(ctx.warrior, 'getMaxHealth').returns(20);
    ctx.warrior.setHealth(10);
    ctx.rest.perform();
    ctx.warrior.getHealth().should.equal(12);
  });

  it('should not add health when at max', (ctx) => {
    ctx.sandbox.stub(ctx.warrior, 'getMaxHealth').returns(20);
    ctx.warrior.setHealth(20);
    ctx.rest.perform();
    ctx.warrior.getHealth().should.equal(20);
  });

  it('should not go over max health', (ctx) => {
    ctx.sandbox.stub(ctx.warrior, 'getMaxHealth').returns(20);
    ctx.warrior.setHealth(19);
    ctx.rest.perform();
    ctx.warrior.getHealth().should.equal(20);
  });
});
