import _ from 'lodash';
import chai from 'chai';
import sinon from 'sinon';
import { it, beforeEach } from 'arrow-mocha/es5';
import chalk from 'chalk';
import chaiAlive from '../../helpers/chaiAlive';
import Base from '../../../src/units/Base';
import Walk from '../../../src/abilities/Walk';
import Floor from '../../../src/Floor';
import UI from '../../../src/UI';

const should = chai.should();
chai.use(chaiAlive);

describe('Base', () => {
  beforeEach((ctx) => {
    ctx.unit = new Base();
  });

  it('should have an attack power which defaults to zero', (ctx) => {
    ctx.unit.getAttackPower().should.equal(0);
  });

  it('should have a shoot power which defaults to zero', (ctx) => {
    ctx.unit.getShootPower().should.equal(0);
  });

  it('should consider itself dead when no position', (ctx) => {
    should.equal(ctx.unit.getPosition(), null);
    ctx.unit.should.not.be.alive;
  });

  it('should consider itself alive with position', (ctx) => {
    ctx.unit.setPosition({});
    ctx.unit.should.be.alive;
  });

  it('should do nothing when earning points', (ctx) => {
    ctx.unit.earnPoints.bind(ctx.unit, 10).should.not.throw(Error);
  });

  it('should default max health to 0', (ctx) => {
    ctx.unit.getMaxHealth().should.equal(0);
  });

  it('should default health to max health', (ctx) => {
    ctx.sandbox.stub(ctx.unit, 'getMaxHealth').returns(10);
    ctx.unit.getHealth().should.equal(ctx.unit.getMaxHealth());
  });

  it('should subtract health when taking damage', (ctx) => {
    ctx.sandbox.stub(ctx.unit, 'getMaxHealth').returns(10);
    ctx.unit.takeDamage(3);
    ctx.unit.getHealth().should.equal(7);
  });

  it('should not go under zero health when taking damage', (ctx) => {
    ctx.sandbox.stub(ctx.unit, 'getMaxHealth').returns(10);
    ctx.unit.takeDamage(11);
    ctx.unit.getHealth().should.equal(0);
  });

  it('should do nothing when taking damage if health isn\'t set', (ctx) => {
    ctx.unit.takeDamage.bind(ctx.unit, 3).should.not.throw(Error);
  });

  it('should set position to null when running out of health', (ctx) => {
    ctx.unit.setPosition({});
    ctx.sandbox.stub(ctx.unit, 'getMaxHealth').returns(10);
    ctx.unit.takeDamage(10);
    should.equal(ctx.unit.getPosition(), null);
  });

  it('should print out line with name when speaking', (ctx) => {
    const expectation = ctx.sandbox.mock(UI).expects('printLineWithDelay').withArgs(sinon.match(/Base foo/));
    ctx.unit.say('foo');
    expectation.verify();
  });

  it('should return name in toString', (ctx) => {
    ctx.unit.getName().should.equal('Base');
    ctx.unit.toString().should.equal('Base');
  });

  it('should prepare turn by calling playTurn with next turn object', (ctx) => {
    ctx.sandbox.stub(ctx.unit, 'getNextTurn').returns('nextTurn');
    const expectation = ctx.sandbox.mock(ctx.unit).expects('playTurn').withArgs('nextTurn');;
    ctx.unit.prepareTurn();
    expectation.verify();
  });

  it('should perform action when calling perform on turn', (ctx) => {
    ctx.unit.setPosition({});
    const expectation = ctx.sandbox.mock(Walk.prototype).expects('perform').withArgs('backward');
    ctx.unit.addActions(['walk']);
    const turn = { getAction: ctx.sandbox.stub().returns(['walk', ['backward']])};
    ctx.sandbox.stub(ctx.unit, 'getNextTurn').returns(turn);
    ctx.unit.prepareTurn();
    ctx.unit.performTurn();
    expectation.verify();
  });

  it('should not perform action when dead (no position)', (ctx) => {
    ctx.unit.setPosition(null);
    ctx.sandbox.stub(Walk.prototype, 'perform').throws('action should not be called');
    ctx.unit.addActions(['walk']);
    const turn = { getAction: ctx.sandbox.stub().returns(['walk', ['backward']])};
    ctx.sandbox.stub(ctx.unit, 'getNextTurn').returns(turn);
    ctx.unit.prepareTurn();
    ctx.unit.performTurn();
  });

  it('should not raise an exception when calling performTurn when there\'s no action', (ctx) => {
    ctx.unit.prepareTurn();
    ctx.unit.performTurn.bind(ctx.unit).should.not.throw(Error);
  });

  it('should appear as ? on map', (ctx) => {
    chalk.stripColor(ctx.unit.getCharacter()).should.equal('?');
  });


  it('should be released from bonds when taking damage', (ctx) => {
    ctx.sandbox.stub(ctx.unit, 'getMaxHealth').returns(10);
    ctx.unit.bind();
    ctx.unit.should.be.bound;
    ctx.unit.takeDamage(2);
    ctx.unit.should.not.be.bound;
  });

  it('should be released from bonds when calling release', (ctx) => {
    ctx.unit.bind();
    ctx.unit.unbind();
    ctx.unit.should.not.be.bound;
  });

  it('should not perform action when bound', (ctx) => {
    ctx.unit.setPosition({});
    ctx.unit.bind();
    ctx.sandbox.stub(Walk.prototype, 'perform').throws('action should not be called');
    ctx.unit.addActions(['walk']);
    const turn = { getAction: ctx.sandbox.stub().returns(['walk', ['backward']])};
    ctx.sandbox.stub(ctx.unit, 'getNextTurn').returns(turn);
    ctx.unit.prepareTurn();
    ctx.unit.performTurn();
  });

  describe('with explosive', () => {
    beforeEach((ctx) => {
      ctx.floor = new Floor();
      ctx.floor.setWidth(2);
      ctx.floor.setHeight(3);
      ctx.floor.addUnit(ctx.unit, 0, 0);
      ctx.unit.addActions(['explode']);
    });

    it('should explode when time reaches 0', (ctx) => {
      ctx.unit.setHealth(10);
      ctx.unit.getActions().explode.setTime(3);
      _.times(2, () => {
        ctx.unit.prepareTurn();
        ctx.unit.performTurn();
      });
      ctx.unit.getHealth().should.equal(10);
      ctx.unit.prepareTurn();
      ctx.unit.performTurn();
      ctx.unit.getHealth().should.equal(0);
    });
  });
});
