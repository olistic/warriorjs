import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import DistanceOf from '../../../src/abilities/DistanceOf';

chai.should();

describe('Direction of', () => {
  beforeEach((ctx) => {
    ctx.unit = {
      getPosition: ctx.sandbox.stub().returns({ getDistanceOf: () => null }),
      say: () => null
    };
    ctx.distanceOf = new DistanceOf(ctx.unit);
  });

  it('should return relative direction of given space', (ctx) => {
    ctx.sandbox.stub(ctx.unit.getPosition(), 'getDistanceOf').withArgs('space').returns(5);
    ctx.distanceOf.perform('space').should.equal(5);
  });
});
