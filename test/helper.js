import { beforeEach, afterEach } from 'arrow-mocha/es5';
import sinon from 'sinon';
import Config from '../src/config';

beforeEach((ctx) => {
  Config.reset();
  ctx.sandbox = sinon.sandbox.create();
});

afterEach((ctx) => {
  ctx.sandbox.restore();
});
