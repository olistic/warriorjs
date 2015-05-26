import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import chalk from 'chalk';
import Sludge from '../../../src/units/Sludge';

chai.should();

describe('Sludge', () => {
  beforeEach((ctx) => {
    ctx.sludge = new Sludge();
  });

  it('should have attack action', (ctx) => {
    ctx.sludge.getActions().should.include.key('attack');
  });

  it('should have feel sense', (ctx) => {
    ctx.sludge.getSenses().should.include.key('feel');
  });

  it('should have attack power of 3', (ctx) => {
    ctx.sludge.getAttackPower().should.equal(3);
  });

  it('should have 12 max health', (ctx) => {
    ctx.sludge.getMaxHealth().should.equal(12);
  });

  it('should appear as s on map', (ctx) => {
    chalk.stripColor(ctx.sludge.getCharacter()).should.equal('s');
  });
});
