import fs from 'fs';
import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import chaiPassed from '../helpers/chaiPassed';
import Profile from '../../src/Profile';
import Floor from '../../src/Floor';
import Level from '../../src/Level';
import Base from '../../src/units/Base';
import Warrior from '../../src/units/Warrior';

const should = chai.should();
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

  it('should have a grade relative to ace score', (ctx) => {
    ctx.level.setAceScore(100);
    ctx.level.getGradeFor(110).should.equal('S');
    ctx.level.getGradeFor(100).should.equal('S');
    ctx.level.getGradeFor(99).should.equal('A');
    ctx.level.getGradeFor(89).should.equal('B');
    ctx.level.getGradeFor(79).should.equal('C');
    ctx.level.getGradeFor(69).should.equal('D');
    ctx.level.getGradeFor(59).should.equal('F');
  });

  it('should have no grade if there is no ace score', (ctx) => {
    ctx.level.setAceScore(null);
    should.equal(ctx.level.getGradeFor(100), null);
  });

  it('should have a player path from profile', (ctx) => {
    ctx.sandbox.stub(ctx.profile, 'getPlayerPath').returns('path/to/player');
    ctx.level.getPlayerPath().should.equal('path/to/player');
  });

  it('should exist if file exists', (ctx) => {
    ctx.sandbox.stub(ctx.level, 'getLoadPath').returns('/foo/bar');
    const expectation = ctx.sandbox.mock(fs).expects('existsSync').withArgs('/foo/bar').returns(true);
    ctx.level.exists().should.be.true;
    expectation.verify();
  });

  describe('playing', () => {
    beforeEach((ctx) => {
      ctx.level.loadLevel = ctx.sandbox.stub();
    });

    it('should call prepareTurn and playTurn on each object specified number of times', (ctx) => {
      const object = new Base();
      const mock = ctx.sandbox.mock(object);
      const expectationOne = mock.expects('prepareTurn').twice();
      const expectationTwo = mock.expects('performTurn').twice();
      ctx.floor.addUnit(object, 0, 0, 'north');
      ctx.level.play(2);
      expectationOne.verify();
      expectationTwo.verify();
    });

    it('should return immediately when passed', (ctx) => {
      const object = new Base();
      const expectation = ctx.sandbox.mock(object).expects('performTurn').never();
      ctx.floor.addUnit(object, 0, 0, 'north');
      ctx.sandbox.stub(ctx.level, 'passed').returns(true);
      ctx.level.play(2);
      expectation.verify();
    });

    it('should count down time bonus once each turn', (ctx) => {
      ctx.level.setTimeBonus(10);
      ctx.level.play(3);
      ctx.level.getTimeBonus().should.equal(7);
    });

    it('should not count down time bonus below 0', (ctx) => {
      ctx.level.setTimeBonus(2);
      ctx.level.play(5);
      ctx.level.getTimeBonus().should.equal(0);
    });

    it('should have a pretty score calculation', (ctx) => {
      ctx.level.scoreCalculation(123, 45).should.equal('123 + 45 = 168');
    });

    it('should not have a score calculation when starting score is zero', (ctx) => {
      ctx.level.scoreCalculation(0, 45).should.equal('45');
    });
  });

  describe('tallying points', () => {
    beforeEach((ctx) => {
      ctx.warrior = { getScore: () => 0, getActions: ctx.sandbox.stub().returns({}), getSenses: ctx.sandbox.stub().returns({}) };
      ctx.sandbox.stub(ctx.level, 'getWarrior').returns(ctx.warrior);
      ctx.stub = ctx.sandbox.stub(ctx.level.getFloor(), 'getOtherUnits').returns([{}]);
    });

    it('should add warrior score to profile', (ctx) => {
      ctx.sandbox.stub(ctx.warrior, 'getScore').returns(30);
      ctx.level.tallyPoints();
      ctx.profile.getScore().should.equal(30);
    });

    it('should add warrior score to profile for epic mode', (ctx) => {
      ctx.profile.enableEpicMode();
      ctx.sandbox.stub(ctx.warrior, 'getScore').returns(30);
      ctx.level.tallyPoints();
      ctx.profile.getCurrentEpicScore().should.equal(30);
    });

    it('should add level grade percent to profile for epic mode', (ctx) => {
      ctx.level.setAceScore(100);
      ctx.profile.enableEpicMode();
      ctx.sandbox.stub(ctx.warrior, 'getScore').returns(30);
      ctx.level.tallyPoints();
      ctx.profile.getCurrentEpicGrades().should.eql({ 1: 0.3 });
    });

    it('should not add level grade if ace score is not set', (ctx) => {
      ctx.level.setAceScore(null);
      ctx.profile.enableEpicMode();
      ctx.sandbox.stub(ctx.warrior, 'getScore').returns(30);
      ctx.level.tallyPoints();
      ctx.profile.getCurrentEpicGrades().should.eql({});
    });

    it('should apply time bonus to profile score', (ctx) => {
      ctx.level.setTimeBonus(20);
      ctx.level.tallyPoints();
      ctx.profile.getScore().should.equal(20);
    });
  });
});
