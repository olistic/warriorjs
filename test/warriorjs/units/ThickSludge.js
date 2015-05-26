import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import chalk from 'chalk';
import ThickSludge from '../../../src/units/ThickSludge';

chai.should();

describe('ThickSludge', () => {
  beforeEach((ctx) => {
    ctx.thickSludge = new ThickSludge();
  });

  it('should have 24 max health', (ctx) => {
    ctx.thickSludge.getMaxHealth().should.equal(24);
  });

  it('should appear as S on map', (ctx) => {
    chalk.stripColor(ctx.thickSludge.getCharacter()).should.equal('S');
  });

  it('should have the name of \'Thick Sludge\'', (ctx) => {
    ctx.thickSludge.getName().should.equal('Thick Sludge');
  });
});
