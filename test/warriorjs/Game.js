import fs from 'fs';
import _ from 'lodash';
import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import glob from 'glob';
import Game from '../../src/Game';
import Profile from '../../src/Profile';
import UI from '../../src/UI';

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

  it('should load profiles for each profile path', (ctx) => {
    const mock = ctx.sandbox.mock(Profile);
    const expectationOne = mock.expects('load').withArgs('foo/.profile').returns(1);
    const expectationTwo = mock.expects('load').withArgs('bar/.profile').returns(2);
    ctx.sandbox.stub(ctx.game, 'getProfilePaths').returns(['foo/.profile', 'bar/.profile']);
    ctx.game.getProfiles().should.eql([1, 2]);
    expectationOne.verify();
    expectationTwo.verify();
  });

  it('should find profile paths using glob search', (ctx) => {
    const expectation = ctx.sandbox.mock(glob).expects('sync').withArgs('warriorjs/**/.profile');
    ctx.game.getProfilePaths();
    expectation.verify();
  });

  it('should try to create profile when no profile paths are specified', (ctx) => {
    ctx.sandbox.stub(ctx.game, 'getProfiles').returns([]);
    const expectation = ctx.sandbox.mock(ctx.game).expects('newProfile').returns('profile');
    ctx.game.getProfile().should.equal('profile');
    expectation.verify();
  });

  it('should ask a player to choose a profile if multiple profiles are available, but only once', (ctx) => {
    ctx.sandbox.stub(ctx.game, 'getProfiles').returns(['profile1']);
    const expectation = ctx.sandbox.mock(UI).expects('choose').withArgs('profile', ['profile1', 'New profile']).returns('profile1');
    ctx.game.getProfile().should.equal('profile1');
    _.times(2, () => ctx.game.getProfile().should.equal('profile1'));
    expectation.verify();
  });

  it('should ask user to choose a tower when creating a new profile', (ctx) => {
    ctx.sandbox.stub(UI, 'request').returns('');
    ctx.sandbox.stub(ctx.game, 'getTowers').returns(['tower1', 'tower2']);
    const expectation = ctx.sandbox.mock(UI).expects('choose').withArgs('tower', ['tower1', 'tower2']).returns({ getPath: ctx.sandbox.stub().returns('/foo/bar') });
    ctx.game.newProfile();
    expectation.verify();
  });
});
