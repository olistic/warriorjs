import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import chaiBound from '../../helpers/chaiBound';
import Bind from '../../../src/abilities/Bind';
import Base from '../../../src/units/Base';

chai.should();
chai.use(chaiBound);

describe('Bind', () => {
  beforeEach((ctx) => {
    ctx.bind = new Bind({ say: () => null });
  });

  it('should bind receiver', (ctx) => {
    const receiver = new Base();
    ctx.sandbox.stub(ctx.bind, 'getUnit').returns(receiver);
    ctx.bind.perform();
    receiver.should.be.bound;
  });

  it('should do nothing if no recipient', (ctx) => {
    ctx.sandbox.stub(ctx.bind, 'getUnit').returns(null);
    ctx.bind.perform.bind(ctx.bind).should.not.throw(Error);
  });
});
