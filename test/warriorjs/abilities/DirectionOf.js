import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import DirectionOf from '../../../src/abilities/DirectionOf';

chai.should();

describe('Direction of', () => {
  beforeEach((ctx) => {
    ctx.unit = {
      getPosition: ctx.sandbox.stub().returns({ getRelativeDirectionOf: () => null }),
      say: () => null
    };
    ctx.directionOf = new DirectionOf(ctx.unit);
  });

  it('should return relative direction of given space', (ctx) => {
    ctx.sandbox.stub(ctx.unit.getPosition(), 'getRelativeDirectionOf').withArgs('space').returns('left');
    ctx.directionOf.perform('space').should.equal('left');
  });
});
