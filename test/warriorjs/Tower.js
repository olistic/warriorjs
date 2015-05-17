import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Tower from '../../src/Tower';

chai.should();

describe('Tower', () => {
  beforeEach((ctx) => {
    ctx.tower = new Tower('path/to/tower');
  });

  it('should consider last part of path as name', (ctx) => {
    ctx.tower.getName().should.equal('tower');
  });

  it('should use name when converting to string', (ctx) => {
    ctx.tower.toString().should.equal(ctx.tower.getName());
  });
});
