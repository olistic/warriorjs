import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import chalk from 'chalk';
import Warrior from '../../../src/units/Warrior';

chai.should();

class Player {
  playTurn(warrior) {
  }
}

describe('Warrior', () => {
  beforeEach((ctx) => {
    ctx.warrior = new Warrior();
  });

  it('should default name to Warrior', (ctx) => {
    ctx.warrior.getName().should.equal('Warrior');
    ctx.warrior.setName('');
    ctx.warrior.getName().should.equal('Warrior');
  });

  it('should be able to set name', (ctx) => {
    ctx.warrior.setName('Joe');
    ctx.warrior.getName().should.equal('Joe');
    ctx.warrior.toString().should.equal('Joe');
  });

  it('should have 20 max health', (ctx) => {
    ctx.warrior.getMaxHealth().should.equal(20);
  });

  it('should have 0 score at beginning and be able to earn points', (ctx) => {
    ctx.warrior.getScore().should.equal(0);
    ctx.warrior.earnPoints(5);
    ctx.warrior.getScore().should.equal(5);
  });

  it('should call player.playTurn and pass turn to player', (ctx) => {
    const player = new Player();
    const expectation = ctx.sandbox.mock(player).expects('playTurn').withArgs('turn');
    ctx.sandbox.stub(ctx.warrior, 'getPlayer').returns(player);
    ctx.warrior.playTurn('turn');
    expectation.verify();
  });

  it('should have an attack power of 5', (ctx) => {
    ctx.warrior.getAttackPower().should.equal(5);
  });

  it('should have an shoot power of 3', (ctx) => {
    ctx.warrior.getShootPower().should.equal(3);
  });

  it('should appear as @ on map', (ctx) => {
    chalk.stripColor(ctx.warrior.getCharacter()).should.equal('@');
  });
});
