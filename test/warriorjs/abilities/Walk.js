import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Walk from '../../../src/abilities/Walk';

chai.should();

describe('Walk', () => {
  beforeEach((ctx) => {
    ctx.space = {
      isEmpty: ctx.sandbox.stub().returns(true),
      getUnit: ctx.sandbox.stub().returns(null)
    };
    ctx.position = {
      getRelativeSpace: () => ctx.space,
      move: () => null
    };
    ctx.walk = new Walk({
      getPosition: () => ctx.position,
      say: () => null
    });
  });

  it('should move position forward when calling perform', (ctx) => {
    const expectation = ctx.sandbox.mock(ctx.position).expects('move').withArgs(1, 0);
    ctx.walk.perform();
    expectation.verify();
  });

  it('should move position right if that is direction', (ctx) => {
    const expectation = ctx.sandbox.mock(ctx.position).expects('move').withArgs(0, 1);
    ctx.walk.perform('right');
    expectation.verify();
  });

  it('should keep position if something is in the way', (ctx) => {
    const expectation = ctx.sandbox.mock(ctx.position).expects('move').never();
    ctx.space.isEmpty.returns(false);
    ctx.walk.perform.bind(ctx.walk, 'right').should.not.throw(Error);
    expectation.verify();
  });
});
