import _ from 'lodash';
import chai from 'chai';
import { it, beforeEach } from 'arrow-mocha/es5';
import Detonate from '../../../src/abilities/Detonate';
import Base from '../../../src/units/Base';
import Warrior from '../../../src/units/Warrior';
import Captive from '../../../src/units/Captive';
import Floor from '../../../src/Floor';

chai.should();

describe('Detonate', () => {
  beforeEach((ctx) => {
    ctx.floor = new Floor();
    ctx.floor.setWidth(2);
    ctx.floor.setHeight(3);
    ctx.warrior = new Warrior();
    ctx.floor.addUnit(ctx.warrior, 0, 0, 'south');
    ctx.detonate = new Detonate(ctx.warrior);
  });

  it('should subtract 8 from forward unit and 4 from surrounding units', (ctx) => {
    const targetUnit = new Base();
    targetUnit.setHealth(15);
    const secondUnit = new Base();
    secondUnit.setHealth(15);
    ctx.floor.addUnit(targetUnit, 0, 1);
    ctx.floor.addUnit(secondUnit, 1, 1);
    ctx.detonate.perform();
    targetUnit.getHealth().should.equal(7);
    secondUnit.getHealth().should.equal(11);
  });

  it('should subtract 8 from forward unit and 4 from surrounding units', (ctx) => {
    const targetUnit = new Base();
    targetUnit.setHealth(15);
    const secondUnit = new Base();
    secondUnit.setHealth(15);
    ctx.floor.addUnit(targetUnit, 1, 0);
    ctx.floor.addUnit(secondUnit, 1, 1);
    ctx.detonate.perform('left');
    targetUnit.getHealth().should.equal(7);
    secondUnit.getHealth().should.equal(11);
  });

  it('should detonate an explosive if any unit has one', (ctx) => {
    const captive = new Captive();
    captive.setHealth(1);
    captive.addActions(['explode']);
    ctx.floor.addUnit(captive, 1, 1);
    ctx.detonate.perform();
    captive.getHealth().should.equal(-99);
    ctx.warrior.getHealth().should.equal(-80);
  });
});
