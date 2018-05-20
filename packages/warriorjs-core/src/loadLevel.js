import Floor from './Floor';
import Level from './Level';
import Unit from './Unit';
import Warrior from './Warrior';
import loadPlayer from './loadPlayer';

/**
 * Loads the abilities onto the unit.
 *
 * @param {Unit} unit The unit.
 * @param {Object} abilities The abilities to load.
 */
function loadAbilities(unit, abilities = {}) {
  Object.entries(abilities).forEach(([abilityName, abilityCreator]) => {
    const ability = abilityCreator(unit);
    unit.addAbility(abilityName, ability);
  });
}

/**
 * Loads the effects onto the unit.
 *
 * @param {Unit} unit The unit.
 * @param {Object} effects The effects to load.
 */
function loadEffects(unit, effects = {}) {
  Object.entries(effects).forEach(([effectName, effectCreator]) => {
    const effect = effectCreator(unit);
    unit.addEffect(effectName, effect);
  });
}

/**
 * Loads the warrior.
 *
 * @param {Object} warriorConfig The config of the warrior.
 * @param {Floor} floor The floor of the level.
 * @param {string} [playerCode] The code of the player.
 */
function loadWarrior(
  { name, character, maxHealth, abilities, effects, position },
  floor,
  playerCode,
) {
  const warrior = new Warrior(name, character, maxHealth);
  loadAbilities(warrior, abilities);
  loadEffects(warrior, effects);
  warrior.playTurn = playerCode ? loadPlayer(playerCode) : () => {};
  floor.addWarrior(warrior, position);
}

/**
 * Loads a unit.
 *
 * @param {Object} unitConfig The config of the unit.
 * @param {Floor} floor The floor of the level.
 */
function loadUnit(
  {
    name,
    character,
    maxHealth,
    reward,
    enemy,
    bound,
    abilities,
    effects,
    playTurn,
    position,
  },
  floor,
) {
  const unit = new Unit(name, character, maxHealth, reward, enemy, bound);
  loadAbilities(unit, abilities);
  loadEffects(unit, effects);
  unit.playTurn = playTurn;
  floor.addUnit(unit, position);
}

/**
 * Loads a level from a level config.
 *
 * @param {Object} levelConfig The config of the level.
 * @param {string} [playerCode] The code of the player.
 *
 * @returns {Level} The loaded level.
 */
function loadLevel(
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
  const floor = new Floor(width, height, stairsLocation);

  loadWarrior(warrior, floor, playerCode);
  units.forEach(unit => loadUnit(unit, floor));

  return new Level(towerName, number, description, tip, clue, timeBonus, floor);
}

export default loadLevel;
