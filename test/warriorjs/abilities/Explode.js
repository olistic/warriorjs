import _ from 'lodash';
import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Explode from '../../../src/abilities/Explode';
import Base from '../../../src/units/Base';
import Captive from '../../../src/units/Captive';
import Floor from '../../../src/Floor';

chai.should();

describe('Explode', () => {
  beforeEach((ctx) => {
    ctx.floor = new Floor();
    ctx.floor.setWidth(2);
    ctx.floor.setHeight(3);
    ctx.captive = new Captive();
    ctx.floor.addUnit(ctx.captive, 0, 0);
    ctx.explode = new Explode(ctx.captive);
  });

  it('should subtract 100 health from each unit on the floor', (ctx) => {
    const unit = new Base();
    unit.setHealth(101);
    ctx.floor.addUnit(unit, 0, 1);
    ctx.captive.setHealth(10);
    ctx.explode.perform();
    ctx.captive.getHealth().should.equal(0);
    unit.getHealth().should.equal(1);
  });

  it('should explode when bomb time reaches zero', (ctx) => {
    ctx.captive.setHealth(10);
    ctx.explode.setTime(3);
    _.times(2, () => ctx.explode.passTurn());
    ctx.captive.getHealth().should.equal(10);
    ctx.explode.passTurn();
    ctx.captive.getHealth().should.equal(0);
  });
});
