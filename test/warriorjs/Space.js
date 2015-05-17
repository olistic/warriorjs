import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import chaiWarrior from '../helpers/chaiWarrior';
import chaiEnemy from '../helpers/chaiEnemy';
import chaiCaptive from '../helpers/chaiCaptive';
import chaiWall from '../helpers/chaiWall';
import chaiStairs from '../helpers/chaiStairs';
import chaiPlayer from '../helpers/chaiPlayer';
import Floor from '../../src/Floor';
import Warrior from '../../src/units/Warrior';
import Sludge from '../../src/units/Sludge';
import Captive from '../../src/units/Captive';

chai.should();
chai.use(chaiWarrior);
chai.use(chaiEnemy);
chai.use(chaiCaptive);
chai.use(chaiWall);
chai.use(chaiStairs);
chai.use(chaiPlayer);

describe('Space', () => {
  beforeEach((ctx) => {
    ctx.floor = new Floor();
    ctx.floor.setWidth(2);
    ctx.floor.setHeight(3);
  });

  describe('with empty space', () => {
    beforeEach((ctx) => {
      ctx.space = ctx.floor.getSpace(0, 0);
    });

    it('should not be enemy', (ctx) => {
      ctx.space.should.not.be.enemy;
    });

    it('should not be warrior', (ctx) => {
      ctx.space.should.not.be.warrior;
    });

    it('should be empty', (ctx) => {
      ctx.space.isEmpty().should.be.true;
    });

    it('should not be wall', (ctx) => {
      ctx.space.should.not.be.wall;
    });

    it('should not be stairs', (ctx) => {
      ctx.space.should.not.be.stairs;
    });

    it('should not be captive', (ctx) => {
      ctx.space.should.not.be.captive;
    });

    it('should say \'nothing\' as name', (ctx) => {
      ctx.space.toString().should.equal('nothing');
    });
  });

  describe('out of bounds', () => {
    beforeEach((ctx) => {
      ctx.space = ctx.floor.getSpace(-1, 1);
    });

    it('should be wall', (ctx) => {
      ctx.space.should.be.wall;
    });

    it('should not be empty', (ctx) => {
      ctx.space.isEmpty().should.be.false;
    });

    it('should have name of \'wall\'', (ctx) => {
      ctx.space.toString().should.equal('wall');
    });
  });

  describe('with warrior', () => {
    beforeEach((ctx) => {
      ctx.floor.addUnit(new Warrior(), 0, 0);
      ctx.space = ctx.floor.getSpace(0, 0);
    });

    it('should be warrior', (ctx) => {
      ctx.space.should.be.warrior;
    });

    it('should be player', (ctx) => {
      ctx.space.should.be.player;
    });

    it('should not be enemy', (ctx) => {
      ctx.space.should.not.be.enemy;
    });

    it('should not be empty', (ctx) => {
      ctx.space.should.not.be.empty;
    });

    it('should know what unit is on that space', (ctx) => {
      ctx.space.getUnit().should.be.instanceOf(Warrior);
    });
  });

  describe('with enemy', () => {
    beforeEach((ctx) => {
      ctx.floor.addUnit(new Sludge(), 0, 0);
      ctx.space = ctx.floor.getSpace(0, 0);
    });

    it('should be enemy', (ctx) => {
      ctx.space.should.be.enemy;
    });

    it('should not be warrior', (ctx) => {
      ctx.space.should.not.be.warrior;
    });

    it('should not be empty', (ctx) => {
      ctx.space.should.not.be.empty;
    });

    it('should have name of unit', (ctx) => {
      ctx.space.toString().should.equal('Sludge');
    });
  });

  describe('with captive', () => {
    beforeEach((ctx) => {
      ctx.floor.addUnit(new Captive(), 0, 0);
      ctx.space = ctx.floor.getSpace(0, 0);
    });

    it('should be captive', (ctx) => {
      ctx.space.should.be.captive;
    });

    it('should not be enemy', (ctx) => {
      ctx.space.should.not.be.enemy;
    });
  });
});
