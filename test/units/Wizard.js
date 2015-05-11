import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Wizard from '../../src/units/Wizard';

chai.should();

describe('Wizard', () => {
  beforeEach((ctx) => {
    ctx.wizard = new Wizard();
  });

  it('should have shoot action', (ctx) => {
    ctx.wizard.getActions().should.include.key('shoot');
  });

  it('should have feel sense', (ctx) => {
    ctx.wizard.getSenses().should.include.key('look');
  });

  it('should have shoot power of 11', (ctx) => {
    ctx.wizard.getShootPower().should.equal(11);
  });

  it('should have 3 max health', (ctx) => {
    ctx.wizard.getMaxHealth().should.equal(3);
  });

  it('should appear as w on map', (ctx) => {
    ctx.wizard.getCharacter().should.equal('w');
  });
});
