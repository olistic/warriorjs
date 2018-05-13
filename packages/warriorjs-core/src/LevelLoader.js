import Floor from './Floor';
import Level from './Level';
import Unit from './Unit';
import Warrior from './Warrior';

class LevelLoader {
  load({
    towerName,
    number,
    description,
    tip,
    clue,
    timeBonus,
    floor: { size, stairs, warrior, units },
  }) {
    const { width, height } = size;
    const stairsLocation = [stairs.x, stairs.y];
    this.floor = new Floor(width, height, stairsLocation);

    this.loadWarrior(warrior);

    units.forEach(
      ({
        name,
        character,
        maxHealth,
        reward,
        captive,
        position,
        abilities,
        effects,
        playTurn,
      }) => {
        const unit = new Unit(name, character, maxHealth, reward, captive);
        this.setUpUnit(unit, position, abilities, effects);
        unit.playTurn = playTurn;
      },
    );

    return new Level(
      towerName,
      number,
      description,
      tip,
      clue,
      timeBonus,
      this.floor,
    );
  }

  loadWarrior({ name, character, maxHealth, position, abilities, effects }) {
    const warrior = new Warrior(name, character, maxHealth);
    this.setUpUnit(warrior, position, abilities, effects);
    this.floor.warrior = warrior;
  }

  setUpUnit(unit, position, abilities = {}, effects = {}) {
    Object.entries(abilities).forEach(([abilityName, abilityCreator]) => {
      const ability = abilityCreator(unit);
      unit.addAbility(abilityName, ability);
    });
    Object.entries(effects).forEach(([effectName, effectCreator]) => {
      const effect = effectCreator(unit);
      unit.addEffect(effectName, effect);
    });
    this.floor.addUnit(unit, position);
  }
}

export default LevelLoader;
