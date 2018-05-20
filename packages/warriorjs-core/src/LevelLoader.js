import loadPlayer from '@warriorjs/player-loader';

import Floor from './Floor';
import Level from './Level';
import Unit from './Unit';
import Warrior from './Warrior';

class LevelLoader {
  /**
   * Loads a level from a level config.
   *
   * @param {Object} levelConfig The config of the level.
   * @param {string} [playerCode] The code of the player.
   *
   * @returns {Level} The loaded level.
   */
  load(
    {
      towerName,
      number,
      description,
      tip,
      clue,
      timeBonus,
      floor: { size, stairs, warrior, units },
    },
    playerCode,
  ) {
    const { width, height } = size;
    const stairsLocation = [stairs.x, stairs.y];
    this.floor = new Floor(width, height, stairsLocation);

    this.loadWarrior(warrior, playerCode);
    units.forEach(unit => this.loadUnit(unit));

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

  /**
   * Loads the warrior.
   *
   * @param {Object} warriorConfig The config of the warrior.
   * @param {string} [playerCode] The code of the player.
   */
  loadWarrior(
    { name, character, maxHealth, position, abilities, effects },
    playerCode,
  ) {
    const warrior = new Warrior(name, character, maxHealth);
    if (playerCode) {
      warrior.player = loadPlayer(playerCode);
    }
    this.setUpUnit(warrior, position, abilities, effects);
  }

  /**
   * Loads a unit.
   *
   * @param {Object} unitConfig The config of the unit.
   */
  loadUnit({
    name,
    character,
    maxHealth,
    reward,
    enemy,
    bound,
    position,
    abilities,
    effects,
    playTurn,
  }) {
    const unit = new Unit(name, character, maxHealth, reward, enemy, bound);
    unit.playTurn = playTurn;
    this.setUpUnit(unit, position, abilities, effects);
  }

  /**
   * Sets up the unit and adds it to the floor.
   *
   * @param {Unit} unit
   * @param {Object} position The position of the unit.
   * @param {Object} abilities The abilities of the unit.
   * @param {Object} effects The effects of the unit.
   */
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
