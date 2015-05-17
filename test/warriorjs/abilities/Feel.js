import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Feel from '../../../src/abilities/Feel';

chai.should();

describe('Feel', () => {
  beforeEach((ctx) => {
    ctx.unit = {
      getPosition: ctx.sandbox.stub().returns({ getRelativeSpace: () => null }),
      say: () => null
    };
    ctx.feel = new Feel(ctx.unit);
  });

  it('should get object at position from offset', (ctx) => {
    const expectation = ctx.sandbox.mock(ctx.unit.getPosition()).expects('getRelativeSpace').withArgs(1, 0);
    ctx.feel.perform('forward');
    expectation.verify();
  });
});
