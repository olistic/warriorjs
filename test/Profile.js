import chai from 'chai';
import chaiEpic from './helpers/chaiEpic';
import Profile from '../src/profile';

const should = chai.should();
chai.use(chaiEpic);

describe('Profile', function () {
  beforeEach(function () {
    this.profile = new Profile();
  });

  it('should have warrior name', function () {
    this.profile.warriorName = 'Joe';
    this.profile.warriorName.should.equal('Joe');
  });

  it('should start level number at 0', function () {
    this.profile.levelNumber.should.equal(0);
  });

  it('should start score at 0 and allow it to increment', function () {
    this.profile.score.should.equal(0);
    this.profile.score += 5;
    this.profile.score.should.equal(5);
  });

  it('should have no abilities and allow adding', function () {
    Object.keys(this.profile.abilities).should.be.empty;
    this.profile.addAbilities({ foo: [], bar: [] });
    Object.keys(this.profile.abilities).should.have.members(['foo', 'bar']);
  });

  it('should encode with JSON + base64', function () {
    this.profile.encode().should.equal(new Buffer(JSON.stringify(this.profile)).toString('base64'));
  });

  it('should add abilities and remove duplicates', function () {
    this.profile.addAbilities({ foo: [], bar: [], blah: [], bar: [] }); // eslint-disable-line no-dupe-keys
    Object.keys(this.profile.abilities).should.have.members(['foo', 'bar', 'blah']);
  });

  it('should enable epic mode and reset scores if null', function () {
    this.profile.epicScore = null;
    this.profile.currentEpicScore = null;
    this.profile.enableEpicMode();
    this.profile.should.be.epic;
    this.profile.epicScore.should.equal(0);
    this.profile.currentEpicScore.should.equal(0);
  });

  it('should override epic score with current one if it is higher', function () {
    this.profile.enableEpicMode();
    this.profile.epicScore.should.equal(0);
    should.equal(this.profile.averageGrade, null);
    this.profile.currentEpicScore = 123;
    this.profile.currentEpicGrades = { 1: 0.7, 2: 0.9 };
    this.profile.updateEpicScore();
    this.profile.epicScore.should.equal(123);
    this.profile.averageGrade.should.equal(0.8);
  });

  it('should not override epic score with current one if it is lower', function () {
    this.profile.enableEpicMode();
    this.profile.epicScore = 124;
    this.profile.averageGrade = 0.9;
    this.profile.currentEpicScore = 123;
    this.profile.currentEpicGrades = { 1: 0.7, 2: 0.9 };
    this.profile.updateEpicScore();
    this.profile.epicScore.should.equal(124);
    this.profile.averageGrade.should.equal(0.9);
  });

  it('should not calculate average grade if no grades are present', function () {
    this.profile.enableEpicMode();
    this.profile.currentEpicGrades = {};
    should.equal(this.profile.calculateAverageGrade(), null);
  });

  it('should remember current level number as lastLevelNumber', function () {
    this.profile.levelNumber = 7;
    this.profile.enableEpicMode();
    this.profile.lastLevelNumber.should.equal(7);
  });

  it('should enable normal mode by clearing epic scores and resetting last level number', function () {
    this.profile.lastLevelNumber = 7;
    this.profile.epicScore = 123;
    this.profile.currentEpicScore = 100;
    this.profile.currentEpicGrades = { 1: 100 };
    this.profile.averageGrade = 'C';
    this.profile.enableNormalMode();
    this.profile.should.not.be.epic;
    this.profile.epicScore.should.equal(0);
    this.profile.currentEpicScore.should.equal(0);
    should.equal(this.profile.lastLevelNumber, null);
    should.equal(this.profile.averageGrade, null);
    this.profile.currentEpicGrades.should.eql({});
    this.profile.levelNumber.should.equal(7);
  });
});
