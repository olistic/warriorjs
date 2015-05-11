import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Turn from '../src/Turn';
import Feel from '../src/abilities/Feel';

const should = chai.should();

describe('Turn', () => {
  describe('with actions', () => {
    beforeEach((ctx) => {
      ctx.turn = new Turn({
        'walk': null,
        'attack': null
      }, {});
    });

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
    beforeEach((ctx) => {
      ctx.feel = new Feel(ctx.sandbox.stub());
      const stub = ctx.sandbox.stub(ctx.feel, 'getSpace');
      stub.returns(ctx.sandbox.stub());
      stub.withArgs('backward').returns(ctx.sandbox.stub());
      ctx.turn = new Turn({}, { 'feel': ctx.feel });
    });

    it('should be able to call sense with any argument and return expected results', (ctx) => {
      ctx.turn.feel().should.equal(ctx.feel.perform());
      ctx.turn.feel('backward').should.equal(ctx.feel.perform('backward'));
      should.equal(ctx.turn.getAction(), null);
    });
  });
});
