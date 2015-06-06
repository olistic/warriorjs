import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Turn from '../../src/Turn';
import Feel from '../../src/abilities/Feel';
import Space from '../../src/Space'

const should = chai.should();

describe('Turn', () => {
  beforeEach((ctx) => {
    ctx.feel = new Feel(ctx.sandbox.stub());
    ctx.sandbox.stub(ctx.feel, 'getSpace').returns(new Space(null, 1, 1));
    ctx.turn = new Turn({
      'walk': null,
      'attack': null
    }, {
      'feel': ctx.feel
    });
  });

  describe('with actions', () => {
    it('should have no action performed at first', (ctx) => {
      should.equal(ctx.turn.getAction(), null);
    });

    it('should be able to perform action and recall it', (ctx) => {
      ctx.turn.walk();
      ctx.turn.getAction().should.eql(['walk', []]);
    });

    it('should include arguments passed to action', (ctx) => {
      ctx.turn.walk('forward');
      ctx.turn.getAction().should.eql(['walk', ['forward']]);
    });

    it('should not be able to call multiple actions per turn', (ctx) => {
      ctx.turn.walk();
      ctx.turn.attack.bind(ctx.turn).should.throw(Error, 'Only one action can be performed per turn.');
    });
  });

  describe('with senses', () => {
    it('should be able to call multiple senses per turn', (ctx) => {
      ctx.turn.feel();
      ctx.turn.feel.bind(ctx.turn, 'backward').should.not.throw(Error);
      should.equal(ctx.turn.getAction(), null);
    });
  });

  describe('player object', () => {
    beforeEach((ctx) => {
      ctx.playerObject = ctx.turn.getPlayerObject();
    });

    it('should be able to call actions and senses', (ctx) => {
      ctx.playerObject.feel.bind(ctx.turn).should.not.throw(Error);
      ctx.playerObject.attack.bind(ctx.turn).should.not.throw(Error);
    });

    it('should not be able to call restricted methods', (ctx) => {
      should.equal(ctx.playerObject.addAction, undefined);
      should.equal(ctx.playerObject.addSense, undefined);
      should.equal(ctx.playerObject.getAction, undefined);
      should.equal(ctx.playerObject._action, undefined);
      should.equal(ctx.playerObject._senses, undefined);
    });
  });
});
