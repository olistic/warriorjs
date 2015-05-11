import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Attack from '../../src/abilities/Attack';
import Base from '../../src/units/Base';

chai.should();

describe('Attack', () => {
  beforeEach((ctx) => {
    ctx.attacker = {
      getPosition: ctx.sandbox.stub().returns({ getRelativeSpace: () => null }),
      getAttackPower: ctx.sandbox.stub().returns(3),
      earnPoints: () => null,
      say: () => null
    };
    ctx.attack = new Attack(ctx.attacker);
  });

  it('should subtract attack power amount from health', (ctx) => {
    const receiver = new Base();
    ctx.sandbox.stub(receiver, 'isAlive').returns(true);
    receiver.setHealth(5);
    ctx.sandbox.stub(ctx.attack, 'getUnit').returns(receiver);
    ctx.attack.perform();
    receiver.getHealth().should.equal(2);
  });

  it('should do nothing if recipient is null', (ctx) => {
    ctx.sandbox.stub(ctx.attack, 'getUnit').returns(null);
    ctx.attack.perform.bind(ctx.attack).should.not.throw(Error);
  });

  it('should get object at position from offset', (ctx) => {
    const expectation = ctx.sandbox.mock(ctx.attacker.getPosition()).expects('getRelativeSpace').withArgs(1, 0);
    ctx.attack.getSpace('forward');
    expectation.verify();
  });

  it('should award points when killing unit', (ctx) => {
    const receiver = {
      takeDamage: ctx.sandbox.stub().returns(null),
      getMaxHealth: ctx.sandbox.stub().returns(8),
      isAlive: ctx.sandbox.stub().returns(false)
    };
    ctx.sandbox.stub(ctx.attack, 'getUnit').returns(receiver);
    const expectation = ctx.sandbox.mock(ctx.attacker).expects('earnPoints').withArgs(8);
    ctx.attack.perform();
    expectation.verify();
  });

  it('should not award points when not killing unit', (ctx) => {
    const receiver = {
      takeDamage: ctx.sandbox.stub().returns(null),
      getMaxHealth: ctx.sandbox.stub().returns(8),
      isAlive: ctx.sandbox.stub().returns(true)
    };
    ctx.sandbox.stub(ctx.attack, 'getUnit').returns(receiver);
    const expectation = ctx.sandbox.mock(ctx.attacker).expects('earnPoints').never();
    ctx.attack.perform();
    expectation.verify();
  });

  it('should reduce attack power when attacking backward', (ctx) => {
    const receiver = new Base();
    ctx.sandbox.stub(receiver, 'isAlive').returns(true);
    receiver.setHealth(5);
    ctx.sandbox.stub(ctx.attack, 'getUnit').returns(receiver);
    ctx.attack.perform('backward');
    receiver.getHealth().should.equal(3);
  });
});
