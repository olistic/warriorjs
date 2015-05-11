import path from 'path';
import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import PlayerGenerator from '../src/PlayerGenerator';
import Level from '../src/Level';
import Profile from '../src/Profile';

chai.should();

describe('PlayerGenerator', () => {
  beforeEach((ctx) => {
    ctx.level = new Level(new Profile(), 15);
    ctx.generator = new PlayerGenerator(ctx.level);
  });

  it('should know templates path', (ctx) => {
    ctx.generator.getTemplatesPath().should.equal(path.resolve(__dirname, '..', 'templates'));
  });
});
