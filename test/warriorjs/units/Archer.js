import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Archer from '../../../src/units/Archer';

chai.should();

describe('Archer', () => {
  beforeEach((ctx) => {
    ctx.archer = new Archer();
  });

  it('should have shoot action', (ctx) => {
    ctx.archer.getActions().should.include.key('shoot');
  });

  it('should have look sense', (ctx) => {
    ctx.archer.getSenses().should.include.key('look');
  });

  it('should have shoot power of 3', (ctx) => {
    ctx.archer.getShootPower().should.equal(3);
  });

  it('should have 7 max health', (ctx) => {
    ctx.archer.getMaxHealth().should.equal(7);
  });

  it('should appear as a on map', (ctx) => {
    ctx.archer.getCharacter().should.equal('a');
  });
});
