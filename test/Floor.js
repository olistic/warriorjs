import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import chaiOutOfBounds from './helpers/chaiOutOfBounds';
import Floor from '../src/Floor';
import Base from '../src/units/Base';
import Warrior from '../src/units/Warrior';
import Space from '../src/Space';

chai.should();
chai.use(chaiOutOfBounds);

describe('Floor', () => {
  describe('2x3', () => {
    beforeEach((ctx) => {
      ctx.floor = new Floor();
      ctx.floor.setWidth(2);
      ctx.floor.setHeight(3);
    });

    it('should be able to add a unit and fetch it at that position', (ctx) => {
      const unit = new Base();
      ctx.floor.addUnit(unit, 0, 1, 'north');
      ctx.floor.getUnit(0, 1).should.equal(unit);
    });

    it('should not consider unit on floor if no position', (ctx) => {
      const unit = new Base();
      ctx.floor.addUnit(unit, 0, 1, 'north');
      unit.setPosition(null);
      ctx.floor.getUnits().should.not.include(unit);
    });

    it('should fetch other units not warrior', (ctx) => {
      const unit = new Base();
      const warrior = new Warrior();
      ctx.floor.addUnit(unit, 0, 0, 'north');
      ctx.floor.addUnit(warrior, 1, 0, 'north');
      ctx.floor.getOtherUnits().should.include(unit);
      ctx.floor.getOtherUnits().should.not.include(warrior);
    });

    it('should not consider corners out of bounds', (ctx) => {
      ctx.floor.should.not.be.outOfBounds(0, 0);
      ctx.floor.should.not.be.outOfBounds(1, 0);
      ctx.floor.should.not.be.outOfBounds(1, 2);
      ctx.floor.should.not.be.outOfBounds(0, 2);
    });

    it('should consider out of bounds when going beyond sides', (ctx) => {
      ctx.floor.should.be.outOfBounds(-1, 0);
      ctx.floor.should.be.outOfBounds(0, -1);
      ctx.floor.should.be.outOfBounds(0, 3);
      ctx.floor.should.be.outOfBounds(2, 0);
    });

    it('should return space at the specified location', (ctx) => {
      ctx.floor.getSpace(0, 0).should.be.instanceOf(Space);
    });

    it('should place stairs and be able to fetch the location', (ctx) => {
      ctx.floor.placeStairs(1, 2);
      ctx.floor.getStairsLocation().should.eql([1, 2]);
    });
  });

  describe('3x1', () => {
    beforeEach((ctx) => {
      ctx.floor = new Floor();
      ctx.floor.setWidth(3);
      ctx.floor.setHeight(1);
    });

    it('should print map with stairs and unit', (ctx) => {
      ctx.floor.addUnit(new Warrior(), 0, 0);
      ctx.floor.placeStairs(2, 0);
      ctx.floor.getCharacter().should.equal(' ---\n|@ >|\n ---\n');
    });

    it('should return unique units', (ctx) => {
      const unit = new Base();
      ctx.floor.addUnit(unit, 0, 0);
      ctx.floor.addUnit(new Base(), 1, 0);
      ctx.floor.getUniqueUnits().should.eql([unit]);
    });
  });
});
