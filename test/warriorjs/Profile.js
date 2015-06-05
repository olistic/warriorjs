import path from 'path';
import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import chaiEpic from '../helpers/chaiEpic';
import Profile from '../../src/profile';

const should = chai.should();
chai.use(chaiEpic);

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
    ctx.profile.addScore(5);
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

  it('should enable epic mode and reset scores if null', (ctx) => {
    ctx.profile.setEpicScore(null);
    ctx.profile.setCurrentEpicScore(null);
    ctx.profile.enableEpicMode();
    ctx.profile.should.be.epic;
    ctx.profile.getEpicScore().should.equal(0);
    ctx.profile.getCurrentEpicScore().should.equal(0);
  });

  it('should override epic score with current one if it is higher', (ctx) => {
    ctx.profile.enableEpicMode();
    ctx.profile.getEpicScore().should.equal(0);
    should.equal(ctx.profile.getAverageGrade(), null);
    ctx.profile.setCurrentEpicScore(123);
    ctx.profile.setCurrentEpicGrades({ 1: 0.7, 2: 0.9 });
    ctx.profile.updateEpicScore();
    ctx.profile.getEpicScore().should.equal(123);
    ctx.profile.getAverageGrade().should.equal(0.8);
  });

  it('should not override epic score with current one if it is lower', (ctx) => {
    ctx.profile.enableEpicMode();
    ctx.profile.setEpicScore(124);
    ctx.profile.setAverageGrade(0.9);
    ctx.profile.setCurrentEpicScore(123);
    ctx.profile.setCurrentEpicGrades({ 1: 0.7, 2: 0.9 });
    ctx.profile.updateEpicScore();
    ctx.profile.getEpicScore().should.equal(124);
    ctx.profile.getAverageGrade().should.equal(0.9);
  });

  it('should not calculate average grade if no grades are present', (ctx) => {
    ctx.profile.enableEpicMode();
    ctx.profile.setCurrentEpicGrades({});
    should.equal(ctx.profile.calculateAverageGrade(), null);
  });

  it('should remember current level number as lastLevelNumber', (ctx) => {
    ctx.profile.setLevelNumber(7);
    ctx.profile.enableEpicMode();
    ctx.profile.getLastLevelNumber().should.equal(7);
  });

  it('should enable normal mode by clearing epic scores and resetting last level number', (ctx) => {
    ctx.profile.setLastLevelNumber(7);
    ctx.profile.setEpicScore(123);
    ctx.profile.setCurrentEpicScore(100);
    ctx.profile.setCurrentEpicGrades({ 1: 100 });
    ctx.profile.setAverageGrade('C');
    ctx.profile.enableNormalMode();
    ctx.profile.should.not.be.epic;
    ctx.profile.getEpicScore().should.equal(0);
    ctx.profile.getCurrentEpicScore().should.equal(0);
    should.equal(ctx.profile.getLastLevelNumber(), null);
    should.equal(ctx.profile.getAverageGrade(), null);
    ctx.profile.getCurrentEpicGrades().should.eql({});
    ctx.profile.getLevelNumber().should.equal(7);
  });

  it('should be no level after epic if last level isn\'t specified', (ctx) => {
    ctx.profile.setLastLevelNumber(null);
    ctx.profile.hasLevelAfterEpic().should.be.false;
  });

  describe('with tower path', () => {
    beforeEach((ctx) => {
      ctx.profile.setWarriorName('Joe');
      ctx.profile.setTowerPath('path/to/tower');
    });

    it('should have a nice string representation', (ctx) => {
      ctx.profile.toString().should.equal('Joe - tower - level 0 - score 0');
    });

    it('should include epic score in string representation', (ctx) => {
      ctx.profile.setWarriorName('Joe');
      ctx.profile.enableEpicMode();
      ctx.profile.toString().should.equal('Joe - tower - first score 0 - epic score 0');
    });

    it('should include epic score with grade in string representation', (ctx) => {
      ctx.profile.setWarriorName('Joe');
      ctx.profile.enableEpicMode();
      ctx.profile.setAverageGrade(0.7);
      ctx.profile.toString().should.equal('Joe - tower - first score 0 - epic score 0 (C)');
    });

    it('should guess at the player path', (ctx) => {
      ctx.profile.getPlayerPath().should.equal(path.normalize('warriorjs/joe-tower'));
    });

    it('should use specified player path', (ctx) => {
      ctx.profile.setPlayerPath('path/to/player');
      ctx.profile.getPlayerPath().should.equal('path/to/player');
    });
  });
});
