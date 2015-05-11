import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Floor from '../src/Floor';
import Base from '../src/units/Base';

const should = chai.should();

describe('Position', () => {
  beforeEach((ctx) => {
    ctx.unit = new Base();
    ctx.floor = new Floor();
    ctx.floor.setWidth(6);
    ctx.floor.setHeight(5);
    ctx.floor.addUnit(ctx.unit, 1, 2, 'north');
    ctx.position = ctx.unit.getPosition();
  });

  it('should rotate clockwise', (ctx) => {
    ctx.position.getDirection().should.equal('north');
    ['east', 'south', 'west', 'north', 'east'].forEach((dir) => {
      ctx.position.rotate(1);
      ctx.position.getDirection().should.equal(dir);
    });
  });

  it('should rotate counterclockwise', (ctx) => {
    ctx.position.getDirection().should.equal('north');
    ['west', 'south', 'east', 'north', 'west'].forEach((dir) => {
      ctx.position.rotate(-1);
      ctx.position.getDirection().should.equal(dir);
    });
  });

  it('should get relative space in front', (ctx) => {
    ctx.floor.addUnit(new Base(), 1, 1);
    ctx.position.getRelativeSpace(1).isEmpty().should.be.false;
  });

  it('should get relative object in front when rotated', (ctx) => {
    ctx.floor.addUnit(new Base(), 2, 2);
    ctx.position.rotate(1);
    ctx.position.getRelativeSpace(1).isEmpty().should.be.false;
  });

  it('should get relative object diagonally', (ctx) => {
    ctx.floor.addUnit(new Base(), 0, 1);
    ctx.position.getRelativeSpace(1, -1).isEmpty().should.be.false;
  });

  it('should get relative object diagonally when rotating', (ctx) => {
    ctx.floor.addUnit(new Base(), 0, 1);
    ctx.position.rotate(2);
    ctx.position.getRelativeSpace(-1, 1).isEmpty().should.be.false;
  });

  it('should move object on floor relatively', (ctx) => {
    ctx.floor.getUnit(1, 2).should.equal(ctx.unit);
    ctx.position.move(-1, 2);
    should.equal(ctx.floor.getUnit(1, 2), undefined);
    ctx.floor.getUnit(3, 3).should.equal(ctx.unit);
    ctx.position.rotate(1);
    ctx.position.move(-1);
    should.equal(ctx.floor.getUnit(3, 3), undefined);
    ctx.floor.getUnit(2, 3).should.equal(ctx.unit);
  });

  it('should return distance from stairs as 0 when on stairs', (ctx) => {
    ctx.floor.placeStairs(1, 2);
    ctx.position.getDistanceFromStairs().should.equal(0);
  });

  it('should return distance from stairs in both directions', (ctx) => {
    ctx.floor.placeStairs(0, 3);
    ctx.position.getDistanceFromStairs().should.equal(2);
  });

  it('should return relative direction of stairs', (ctx) => {
    ctx.floor.placeStairs(0, 0);
    ctx.position.getRelativeDirectionOfStairs().should.equal('forward');
  });

  it('should return relative direction of given space', (ctx) => {
    ctx.position.getRelativeDirectionOf(ctx.floor.getSpace(5, 3)).should.equal('right');
    ctx.position.rotate(1);
    ctx.position.getRelativeDirectionOf(ctx.floor.getSpace(1, 4)).should.equal('right');
  });

  it('should be able to determine relative direction', (ctx) => {
    ctx.position.getRelativeDirection('north').should.equal('forward');
    ctx.position.getRelativeDirection('south').should.equal('backward');
    ctx.position.getRelativeDirection('west').should.equal('left');
    ctx.position.getRelativeDirection('east').should.equal('right');
    ctx.position.rotate(1);
    ctx.position.getRelativeDirection('north').should.equal('left');
    ctx.position.rotate(1);
    ctx.position.getRelativeDirection('north').should.equal('backward');
    ctx.position.rotate(1);
    ctx.position.getRelativeDirection('north').should.equal('right');
  });

  it('should return a space at the same location as position', (ctx) => {
    ctx.position.getSpace().getLocation().should.eql([1, 2]);
  });

  it('should return distance of given space', (ctx) => {
    ctx.position.getDistanceOf(ctx.floor.getSpace(5, 3)).should.equal(5);
    ctx.position.getDistanceOf(ctx.floor.getSpace(4, 2)).should.equal(3);
  });
});
