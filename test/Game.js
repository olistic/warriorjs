import fs from 'fs';
import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Game from '../src/Game';
import UI from '../src/UI';

chai.should();

describe('Game', () => {
  beforeEach((ctx) => {
    ctx.game = new Game();
  });

  it('should make game directory if player says so', (ctx) => {
    ctx.sandbox.stub(UI, 'ask').returns(true);
    const expectation = ctx.sandbox.mock(fs).expects('mkdirSync').withArgs('warriorjs');
    ctx.game.makeGameDirectory();
    expectation.verify();
  });

  it('should not make game and exit if player says no', (ctx) => {
    ctx.sandbox.stub(UI, 'ask').returns(false);
    ctx.sandbox.stub(fs, 'mkdirSync').throws('should not be called');
    ctx.sandbox.stub(process, 'exit');
    ctx.game.makeGameDirectory();
  });
});
