import chai from 'chai';
import fs from 'fs';
import { it, beforeEach } from 'arrow-mocha/es5';
import Profile from '../src/profile';

chai.should();

describe('Profile', () => {
  beforeEach((ctx) => {
    ctx.profile = new Profile();
  });

  it('should have warrior name', (ctx) => {
    ctx.profile.setWarriorName('Joe');
    ctx.profile.getWarriorName().should.equal('Joe');
  });

  it('should start level number at 0', (ctx) => {
    ctx.profile.getLevelNumber().should.equal(0);
  });

  it('should start score at 0 and allow it to increment', (ctx) => {
    ctx.profile.getScore().should.equal(0);
    ctx.profile.setScore(ctx.profile.getScore() + 5);
    ctx.profile.getScore().should.equal(5);
  });

  it('should have no actions and allow adding', (ctx) => {
    ctx.profile.getActions().should.be.empty;
    ctx.profile.addActions(['foo', 'bar']);
    ctx.profile.getActions().should.have.members(['foo', 'bar']);
  });

  it('should have no senses and allow adding', (ctx) => {
    ctx.profile.getSenses().should.be.empty;
    ctx.profile.addSenses(['foo', 'bar']);
    ctx.profile.getSenses().should.have.members(['foo', 'bar']);
  });

  it('should encode with json + base64', (ctx) => {
    ctx.profile.encode().should.equal(new Buffer(JSON.stringify(ctx.profile)).toString('base64'));
  });

  it('should add actions and remove duplicates', (ctx) => {
    ctx.profile.addActions(['foo', 'bar', 'blah', 'bar']);
    ctx.profile.getActions().should.have.members(['foo', 'bar', 'blah']);
  });

  it('should add senses and remove duplicates', (ctx) => {
    ctx.profile.addSenses(['foo', 'bar', 'blah', 'bar']);
    ctx.profile.getSenses().should.have.members(['foo', 'bar', 'blah']);
  });

  it('should fetch new level with current number', (ctx) => {
    ctx.profile.setLevelNumber(1);
    ctx.profile.getCurrentLevel().getNumber().should.equal(1);
  });

  it('should fetch next level', (ctx) => {
    ctx.profile.setLevelNumber(1);
    ctx.profile.getNextLevel().getNumber().should.equal(2);
  });

  describe('with tower path', () => {
    beforeEach((ctx) => {
      ctx.profile.setWarriorName('Joe');
      ctx.profile.setTowerPath('path/to/tower');
    });

    it('should have a nice string representation', (ctx) => {
      ctx.profile.toString().should.equal('Joe - tower - level 0 - score 0');
    });

    it('should guess at the player path', (ctx) => {
      ctx.profile.getPlayerPath().should.equal('warriorjs/joe-tower');
    });

    it('should use specified player path', (ctx) => {
      ctx.profile.setPlayerPath('path/to/player');
      ctx.profile.getPlayerPath().should.equal('path/to/player');
    });
  });
});
