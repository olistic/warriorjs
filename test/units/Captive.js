import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import chaiBound from '../helpers/chaiBound';
import Captive from '../../src/units/Captive';

chai.should();
chai.use(chaiBound);

describe('Captive', () => {
  beforeEach((ctx) => {
    ctx.captive = new Captive();
  });

  it('should have 1 max health', (ctx) => {
    ctx.captive.getMaxHealth().should.equal(1);
  });

  it('should appear as C on map', (ctx) => {
    ctx.captive.getCharacter().should.equal('C');
  });

  it('should be bound by default', (ctx) => {
    ctx.captive.should.be.bound;
  });
});
