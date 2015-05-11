import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import chaiPassed from './helpers/chaiPassed';
import Profile from '../src/Profile';
import Floor from '../src/Floor';
import Level from '../src/Level';
import Warrior from '../src/units/Warrior';

chai.should();
chai.use(chaiPassed);

describe('Level', () => {
  beforeEach((ctx) => {
    ctx.profile = new Profile();
    ctx.floor = new Floor();
    ctx.level = new Level(ctx.profile, 1);
    ctx.level.setFloor(ctx.floor);
    ctx.sandbox.stub(ctx.level, 'failed').returns(false);
  });

  it('should consider passed when warrior is on stairs', (ctx) => {
    ctx.level.warrior = new Warrior();
    ctx.floor.addUnit(ctx.level.warrior, 0, 0, 'north');
    ctx.floor.placeStairs(0, 0);
    ctx.level.should.be.passed;
  });

  it('should default time bonus to zero', (ctx) => {
    ctx.level.getTimeBonus().should.equal(0);
  });

  it('should have a player path from profile', (ctx) => {
    ctx.sandbox.stub(ctx.profile, 'getPlayerPath').returns('path/to/player');
    ctx.level.getPlayerPath().should.equal('path/to/player');
  });
});
