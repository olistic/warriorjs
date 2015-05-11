import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Rescue from '../../src/abilities/Rescue';
import Warrior from '../../src/units/Warrior';
import Captive from '../../src/units/Captive';
import Base from '../../src/units/Base';

const should = chai.should();

describe('Rescue', () => {
  beforeEach((ctx) => {
    ctx.warrior = new Warrior();
    ctx.rescue = new Rescue(ctx.warrior);
  });

  it('should rescue captive', (ctx) => {
    const captive = new Captive();
    captive.setPosition({});
    ctx.sandbox.mock(ctx.rescue).expects('getSpace').withArgs('forward').returns({ isCaptive: ctx.sandbox.stub().returns(true) });
    ctx.sandbox.mock(ctx.rescue).expects('getUnit').withArgs('forward').returns(captive);
    const expectation = ctx.sandbox.mock(ctx.warrior).expects('earnPoints').withArgs(20);
    ctx.rescue.perform();
    should.equal(captive.getPosition(), null);
    expectation.verify();
  });

  it('should do nothing to other unit if not bound', (ctx) => {
    const unit = new Base();
    unit.setPosition({});
    ctx.sandbox.mock(ctx.rescue).expects('getSpace').withArgs('forward').returns({ isCaptive: ctx.sandbox.stub().returns(false) });
    ctx.sandbox.mock(ctx.rescue).expects('getUnit').withArgs('forward').never();
    const expectation = ctx.sandbox.mock(ctx.warrior).expects('earnPoints').never();
    ctx.rescue.perform();
    unit.getPosition().should.not.be.null;
    expectation.verify();
  });
});
