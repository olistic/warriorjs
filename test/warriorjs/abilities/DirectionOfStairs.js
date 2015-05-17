import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import DirectionOfStairs from '../../../src/abilities/DirectionOfStairs';

chai.should();

describe('Direction of stairs', () => {
  beforeEach((ctx) => {
    ctx.unit = {
      getPosition: ctx.sandbox.stub().returns({ getRelativeDirectionOfStairs: () => null }),
      say: () => null
    };
    ctx.directionOfStairs = new DirectionOfStairs(ctx.unit);
  });

  it('should return relative direction of stairs', (ctx) => {
    ctx.sandbox.stub(ctx.unit.getPosition(), 'getRelativeDirectionOfStairs').returns('left');
    ctx.directionOfStairs.perform().should.equal('left');
  });
});
