import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import chaiAlive from '../helpers/chaiAlive';
import Base from '../../src/units/Base';
import Walk from '../../src/abilities/Walk';
import UI from '../../src/UI';

const should = chai.should();
chai.use(chaiAlive);

describe('Base', () => {
  beforeEach((ctx) => {
    ctx.unit = new Base();
  });

  it('should have an attack power which defaults to zero', (ctx) => {
    ctx.unit.getAttackPower().should.equal(0);
  });

  it('should consider itself dead when no position', (ctx) => {
    should.equal(ctx.unit.getPosition(), null);
    ctx.unit.should.not.be.alive;
  });

  it('should consider itself alive with position', (ctx) => {
    ctx.unit.setPosition(ctx.sandbox.stub());
    ctx.unit.should.be.alive;
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

  it('should do nothing when taking damage if health isn\'t set', (ctx) => {
    ctx.unit.takeDamage.bind(ctx.unit, 3).should.not.throw(Error);
  });

  it('should set position to null when running out of health', (ctx) => {
    ctx.unit.setPosition(ctx.sandbox.stub());
    ctx.sandbox.stub(ctx.unit, 'getMaxHealth').returns(10);
    ctx.unit.takeDamage(10);
    should.equal(ctx.unit.getPosition(), null);
  });

  it('should print out line with name when speaking', (ctx) => {
    const expectation = ctx.sandbox.mock(UI).expects('printLineWithDelay').withArgs('Base foo');
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
    ctx.unit.getCharacter().should.equal('?');
  });
});
