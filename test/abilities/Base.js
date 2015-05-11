import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Base from '../../src/abilities/Base';

const should = chai.should();

describe('Base', () => {
  beforeEach((ctx) => {
    ctx.ability = new Base();
  });

  it('should have offset for directions', (ctx) => {
    ctx.ability.offset('forward').should.eql([1, -0]);
    ctx.ability.offset('right').should.eql([0, 1]);
    ctx.ability.offset('backward').should.eql([-1, 0]);
    ctx.ability.offset('left').should.eql([-0, -1]);
  });

  it('should have offset for relative forward/right amounts', (ctx) => {
    ctx.ability.offset('forward', 2).should.eql([2, -0]);
    ctx.ability.offset('forward', 2, 1).should.eql([2, -1]);
    ctx.ability.offset('right', 2, 1).should.eql([1, 2]);
    ctx.ability.offset('backward', 2, 1).should.eql([-2, 1]);
    ctx.ability.offset('left', 2, 1).should.eql([-1, -2]);
  });

  it('should fetch unit at given direction with distance', (ctx) => {
    ctx.sandbox.mock(ctx.ability).expects('getSpace').withArgs('right', 3, 1).returns({ getUnit: ctx.sandbox.stub().returns('unit') });
    ctx.ability.getUnit('right', 3, 1).should.equal('unit');
  });

  it('should have no description', (ctx) => {
    should.equal(ctx.ability.getDescription(), undefined);
  });

  it('should throw an error if direction isn\'t recognized', (ctx) => {
    ctx.ability.verifyDirection.bind(ctx.ability, 'foo').should.throw(Error, 'Unknown direction \'foo\'');
  });
});
