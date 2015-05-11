import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Profile from '../src/Profile';
import Level from '../src/Level';
import LevelLoader from '../src/LevelLoader';

chai.should();

describe('LevelLoader', () => {
  beforeEach((ctx) => {
    ctx.profile = new Profile();
    ctx.level = new Level(ctx.profile, 1);
    ctx.loader = new LevelLoader(ctx.level);
  });

  it('should be able to add description, tip and clue', (ctx) => {
    ctx.loader.description('foo');
    ctx.loader.tip('bar');
    ctx.loader.clue('baz');
    ctx.level.getDescription().should.equal('foo');
    ctx.level.getTip().should.equal('bar');
    ctx.level.getClue().should.equal('baz');
  });

  it('should be able to set size', (ctx) => {
    ctx.loader.size(5, 3);
    ctx.level.getFloor().getWidth().should.equal(5);
    ctx.level.getFloor().getHeight().should.equal(3);
  });

  it('should be able to add stairs', (ctx) => {
    const expectation = ctx.sandbox.mock(ctx.level.getFloor()).expects('placeStairs').withArgs(1, 2);
    ctx.loader.stairs(1, 2);
    expectation.verify();
  });

  it('should be able to set time bonus', (ctx) => {
    ctx.loader.timeBonus(100);
    ctx.level.getTimeBonus().should.equal(100);
  });
});
