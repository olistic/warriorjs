import chai from 'chai';
import sinon from 'sinon';
import { it, beforeEach } from 'arrow-mocha/es5';
import Shoot from '../../../src/abilities/Shoot';

chai.should();

describe('Shoot', () => {
  beforeEach((ctx) => {
    ctx.shooter = {
      getPosition: ctx.sandbox.stub().returns({ getRelativeSpace: () => null }),
      getShootPower: ctx.sandbox.stub().returns(2),
      say: () => null
    };
    ctx.shoot = new Shoot(ctx.shooter);
  });

  it('should shoot only first unit', (ctx) => {
    const receiver = {
      isAlive: ctx.sandbox.stub().returns(true),
      takeDamage: () => null
    };
    const receiverExpectations = ctx.sandbox.mock(receiver);
    receiverExpectations.expects('takeDamage').withArgs(2);
    const other = {
      isAlive: ctx.sandbox.stub().returns(true),
      takeDamage: () => null
    };
    receiverExpectations.expects('takeDamage').never();
    const shootExpectation = ctx.sandbox.mock(ctx.shoot).expects('getUnits').withArgs('forward', sinon.match.any).returns([null, receiver, other, null]);
    ctx.shoot.perform();
    receiverExpectations.verify();
    shootExpectation.verify();
  });

  it('should shoot and do nothing if no units in the way', (ctx) => {
    const expectation = ctx.sandbox.mock(ctx.shoot).expects('getUnits').withArgs('forward', sinon.match.any).returns([null, null]);
    ctx.shoot.perform.bind(ctx.shoot).should.not.throw(Error);
    expectation.verify();
  });
});
