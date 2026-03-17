import type Ability from './Ability.js';
import type { AbilityBinding } from './Ability.js';
import Floor from './Floor.js';
import Level from './Level.js';
import loadPlayer from './loadPlayer.js';
import type { LevelConfig, TowerUnitEntry, UnitConfig } from './types.js';
import Unit from './Unit.js';
import Warrior from './Warrior.js';

type AbilityEntry = AbilityBinding | (new (unit: any) => Ability) | ((unit: Unit) => any);

function loadAbilities(unit: Unit, abilities: Record<string, AbilityEntry> = {}): void {
  for (const [name, entry] of Object.entries(abilities)) {
    if (Array.isArray(entry)) {
      // AbilityBinding: [Class, config]
      const [AbilityClass, config] = entry;
      unit.addAbility(name, new AbilityClass(unit, config));
    } else if (typeof entry === 'function' && entry.prototype?.perform) {
      // Bare ability class (no config)
      unit.addAbility(name, new (entry as new (unit: any) => Ability)(unit));
    } else {
      // Legacy factory function: (unit) => ability
      const ability = (entry as (unit: Unit) => any)(unit);
      unit.addAbility(name, ability);
    }
  }
}

function loadEffects(unit: Unit, effects: Record<string, (unit: Unit) => any> = {}): void {
  for (const [effectName, effectCreator] of Object.entries(effects)) {
    const effect = effectCreator(unit);
    unit.addEffect(effectName, effect);
  }
}

function loadWarrior(
  { name, character, color, maxHealth, abilities, effects, position }: UnitConfig,
  floor: Floor,
  playerCode?: string,
  language: 'javascript' | 'typescript' = 'javascript',
): void {
  const warrior = new Warrior(name, character, color, maxHealth);
  loadAbilities(warrior, abilities);
  loadEffects(warrior, effects);
  warrior.playTurn = playerCode ? loadPlayer(playerCode, language) : () => {};
  floor.addWarrior(warrior, position);
}

function isTowerUnitEntry(entry: UnitConfig | TowerUnitEntry): entry is TowerUnitEntry {
  return 'unit' in entry && entry.unit instanceof Unit;
}

function loadUnitFromConfig(config: UnitConfig, floor: Floor): void {
  const {
    name,
    character,
    color,
    maxHealth,
    reward,
    enemy,
    bound,
    abilities,
    effects,
    playTurn,
    position,
  } = config;
  const unit = new Unit(name, character, color, maxHealth, reward, enemy, bound);
  loadAbilities(unit, abilities);
  loadEffects(unit, effects);
  if (playTurn) {
    unit.playTurn = playTurn;
  }
  floor.addUnit(unit, position);
}

function loadUnitFromInstance(entry: TowerUnitEntry, floor: Floor): void {
  const { unit, effects, position } = entry;
  const declaredAbilities = (unit as any).declaredAbilities;
  if (declaredAbilities) {
    loadAbilities(unit, declaredAbilities);
  }
  if (effects) {
    loadEffects(unit, effects);
  }
  floor.addUnit(unit, position);
}

function loadLevel(
  { number, description, tip, clue, floor: { size, stairs, warrior, units = [] } }: LevelConfig,
  playerCode?: string,
  language: 'javascript' | 'typescript' = 'javascript',
): Level {
  const { width, height } = size;
  const stairsLocation: [number, number] = [stairs.x, stairs.y];
  const floor = new Floor(width, height, stairsLocation);

  loadWarrior(warrior, floor, playerCode, language);
  for (const entry of units) {
    if (isTowerUnitEntry(entry)) {
      loadUnitFromInstance(entry, floor);
    } else {
      loadUnitFromConfig(entry, floor);
    }
  }

  return new Level(number!, description!, tip!, clue!, floor);
}

export default loadLevel;
