import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Pivot from '../../src/abilities/Pivot';

chai.should();

describe('Pivot', () => {
  beforeEach((ctx) => {
    ctx.position = {
      getRelativeSpace: () => ctx.space,
      rotate: () => null
    };
    ctx.pivot = new Pivot({
      getPosition: () => ctx.position,
      say: () => null
    });
  });

  it('should flip around when not passing arguments', (ctx) => {
    const expectation = ctx.sandbox.mock(ctx.position).expects('rotate').withArgs(2);
    ctx.pivot.perform();
    expectation.verify();
  });

  it('should rotate 1 when pivoting right', (ctx) => {
    const expectation = ctx.sandbox.mock(ctx.position).expects('rotate').withArgs(1);
    ctx.pivot.perform('right');
    expectation.verify();
  });
});
