import type { AbilityEntry } from './Ability.js';
import type { EffectEntry } from './Effect.js';
import Floor from './Floor.js';
import Level from './Level.js';
import loadPlayer from './loadPlayer.js';
import type { LevelConfig, UnitConfig } from './types.js';
import type Unit from './Unit.js';
import Warrior from './Warrior.js';

function loadAbilities(unit: Unit, abilities: Record<string, AbilityEntry> = {}): void {
  for (const [name, entry] of Object.entries(abilities)) {
    if (Array.isArray(entry)) {
      const [AbilityClass, config] = entry;
      unit.addAbility(name, new AbilityClass(unit, config));
    } else {
      const AbilityClass = entry;
      unit.addAbility(name, new AbilityClass(unit));
    }
  }
}

function loadEffects(unit: Unit, effects: Record<string, EffectEntry> = {}): void {
  for (const [name, entry] of Object.entries(effects)) {
    if (Array.isArray(entry)) {
      const [EffectClass, config] = entry;
      unit.addEffect(name, new EffectClass(unit, config));
    } else {
      const EffectClass = entry;
      unit.addEffect(name, new EffectClass(unit));
    }
  }
}

function loadWarrior(
  warrior: LevelConfig['floor']['warrior'],
  floor: Floor,
  playerCode?: string,
  language: 'javascript' | 'typescript' = 'javascript',
): void {
  const { name, character, color, maxHealth, abilities, position } = warrior;
  const unit = new Warrior(name, character, color, maxHealth);
  loadAbilities(unit, abilities);
  unit.playTurn = playerCode ? loadPlayer(playerCode, language) : () => {};
  floor.addWarrior(unit, position);
}

function loadUnit({ unit: UnitClass, effects, position }: UnitConfig, floor: Floor): void {
  const unit = new UnitClass();
  if (UnitClass.declaredAbilities) {
    loadAbilities(unit, UnitClass.declaredAbilities);
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
    loadUnit(entry as UnitConfig, floor);
  }

  return new Level(number!, description!, tip!, clue!, floor);
}

export default loadLevel;
