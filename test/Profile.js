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
    this.profile.setWarriorName('Joe');
    this.profile.getWarriorName().should.equal('Joe');
  });

  it('should start level number at 0', function () {
    this.profile.getLevelNumber().should.equal(0);
  });

  it('should start score at 0 and allow it to increment', function () {
    this.profile.getScore().should.equal(0);
    this.profile.addScore(5);
    this.profile.getScore().should.equal(5);
  });

  it('should have no actions and allow adding', function () {
    Array.from(this.profile.getActions()).should.be.empty;
    this.profile.addActions(['foo', 'bar']);
    Array.from(this.profile.getActions()).should.have.members(['foo', 'bar']);
  });

  it('should have no senses and allow adding', function () {
    Array.from(this.profile.getSenses()).should.be.empty;
    this.profile.addSenses(['foo', 'bar']);
    Array.from(this.profile.getSenses()).should.have.members(['foo', 'bar']);
  });

  it('should encode with JSON + base64', function () {
    this.profile.encode().should.equal(new Buffer(JSON.stringify(this.profile)).toString('base64'));
  });

  it('should add actions and remove duplicates', function () {
    this.profile.addActions(['foo', 'bar', 'blah', 'bar']);
    Array.from(this.profile.getActions()).should.have.members(['foo', 'bar', 'blah']);
  });

  it('should add senses and remove duplicates', function () {
    this.profile.addSenses(['foo', 'bar', 'blah', 'bar']);
    Array.from(this.profile.getSenses()).should.have.members(['foo', 'bar', 'blah']);
  });

  it('should enable epic mode and reset scores if null', function () {
    this.profile.setEpicScore(null);
    this.profile.setCurrentEpicScore(null);
    this.profile.enableEpicMode();
    this.profile.should.be.epic;
    this.profile.getEpicScore().should.equal(0);
    this.profile.getCurrentEpicScore().should.equal(0);
  });

  it('should override epic score with current one if it is higher', function () {
    this.profile.enableEpicMode();
    this.profile.getEpicScore().should.equal(0);
    should.equal(this.profile.getAverageGrade(), null);
    this.profile.setCurrentEpicScore(123);
    this.profile.setCurrentEpicGrades({ 1: 0.7, 2: 0.9 });
    this.profile.updateEpicScore();
    this.profile.getEpicScore().should.equal(123);
    this.profile.getAverageGrade().should.equal(0.8);
  });

  it('should not override epic score with current one if it is lower', function () {
    this.profile.enableEpicMode();
    this.profile.setEpicScore(124);
    this.profile.setAverageGrade(0.9);
    this.profile.setCurrentEpicScore(123);
    this.profile.setCurrentEpicGrades({ 1: 0.7, 2: 0.9 });
    this.profile.updateEpicScore();
    this.profile.getEpicScore().should.equal(124);
    this.profile.getAverageGrade().should.equal(0.9);
  });

  it('should not calculate average grade if no grades are present', function () {
    this.profile.enableEpicMode();
    this.profile.setCurrentEpicGrades({});
    should.equal(this.profile.calculateAverageGrade(), null);
  });

  it('should remember current level number as lastLevelNumber', function () {
    this.profile.setLevelNumber(7);
    this.profile.enableEpicMode();
    this.profile.getLastLevelNumber().should.equal(7);
  });

  it('should enable normal mode by clearing epic scores and resetting last level number', function () {
    this.profile.setLastLevelNumber(7);
    this.profile.setEpicScore(123);
    this.profile.setCurrentEpicScore(100);
    this.profile.setCurrentEpicGrades({ 1: 100 });
    this.profile.setAverageGrade('C');
    this.profile.enableNormalMode();
    this.profile.should.not.be.epic;
    this.profile.getEpicScore().should.equal(0);
    this.profile.getCurrentEpicScore().should.equal(0);
    should.equal(this.profile.getLastLevelNumber(), null);
    should.equal(this.profile.getAverageGrade(), null);
    this.profile.getCurrentEpicGrades().should.eql({});
    this.profile.getLevelNumber().should.equal(7);
  });
});
