import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Look from '../../../src/abilities/Look';

chai.should();

describe('Look', () => {
  beforeEach((ctx) => {
    ctx.unit = {
      getPosition: ctx.sandbox.stub().returns({ getRelativeSpace: () => null }),
      say: () => null
    };
    ctx.look = new Look(ctx.unit);
  });

  it('should get three proxy objects at position from offset', (ctx) => {
    const expectations = ctx.sandbox.mock(ctx.unit.getPosition());
    expectations.expects('getRelativeSpace').withArgs(1, 0).returns({ getPlayerObject: () => 1 });
    expectations.expects('getRelativeSpace').withArgs(2, 0).returns({ getPlayerObject: () => 2 });
    expectations.expects('getRelativeSpace').withArgs(3, 0).returns({ getPlayerObject: () => 3 });
    ctx.look.perform('forward').should.eql([1, 2, 3]);
    expectations.verify();
  });
});
