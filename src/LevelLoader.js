import fs from 'fs-extra';
import Floor from './Floor';
import Archer from './units/Archer';
import Captive from './units/Captive';
import Sludge from './units/Sludge';
import ThickSludge from './units/ThickSludge';
import Warrior from './units/Warrior';
import Wizard from './units/Wizard';

class LevelLoader {
  constructor(level) {
    this._floor = new Floor();
    this._level = level;
    this._level.setFloor(this._floor);
  }

  load() {
    const level = fs.readJsonSync(this._level.getLoadPath());

    this.description(level.description);
    this.tip(level.tip);
    this.clue(level.clue);

    this.timeBonus(level.timeBonus);
    this.size(level.size.width, level.size.height);
    this.stairs(level.stairs.x, level.stairs.y);

    this.warrior(level.warrior.x, level.warrior.y, level.warrior.facing, level.warrior.abilities.actions, level.warrior.abilities.senses);

    level.units.forEach((unit) => {
      this.unit(unit.type, unit.x, unit.y, unit.facing);
    });
  }

  description(desc) {
    this._level.setDescription(desc);
  }

  tip(tip) {
    this._level.setTip(tip);
  }

  clue(clue) {
    this._level.setClue(clue);
  }

  timeBonus(bonus) {
    this._level.setTimeBonus(bonus);
  }

  size(width, height) {
    this._floor.setWidth(width);
    this._floor.setHeight(height);
  }

  stairs(x, y) {
    this._floor.placeStairs(x, y);
  }

  unit(type, x, y, facing, actions, senses) {
    let unit;
    switch (type) {
      case 'archer':
        unit = new Archer();
        break;
      case 'captive':
        unit = new Captive();
        break;
      case 'sludge':
        unit = new Sludge();
        break;
      case 'thickSludge':
        unit = new ThickSludge();
        break;
      case 'warrior':
        unit = new Warrior();
        break;
      case 'wizard':
        unit = new Wizard();
        break;
      default:
        throw new Error('Unknown unit');
    }

    this._floor.addUnit(unit, x, y, facing);

    if (actions) {
      unit.addActions(actions);
    }

    if (senses) {
      unit.addSenses(senses);
    }

    return unit;
  }

  warrior(x, y, facing, actions, senses) {
    return this._level.setupWarrior(this.unit('warrior', x, y, facing, actions, senses));
  }
}

export default LevelLoader;
