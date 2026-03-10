import Floor from './Floor.js';
import Level from './Level.js';
import loadPlayer from './loadPlayer.js';
import Unit from './Unit.js';
import Warrior from './Warrior.js';

interface UnitConfig {
  name: string;
  character: string;
  color: string;
  maxHealth: number;
  reward?: number;
  enemy?: boolean;
  bound?: boolean;
  abilities?: Record<string, (unit: Unit) => any>;
  effects?: Record<string, (unit: Unit) => any>;
  playTurn?: (turn: any) => void;
  position: { x: number; y: number; facing: string };
}

interface WarriorConfig extends UnitConfig {}

interface LevelConfig {
  number?: number;
  description?: string;
  tip?: string;
  clue?: string;
  floor: {
    size: { width: number; height: number };
    stairs: { x: number; y: number };
    warrior: WarriorConfig;
    units?: UnitConfig[];
  };
}

function loadAbilities(unit: Unit, abilities: Record<string, (unit: Unit) => any> = {}): void {
  Object.entries(abilities).forEach(([abilityName, abilityCreator]) => {
    const ability = abilityCreator(unit);
    unit.addAbility(abilityName, ability);
  });
}

function loadEffects(unit: Unit, effects: Record<string, (unit: Unit) => any> = {}): void {
  Object.entries(effects).forEach(([effectName, effectCreator]) => {
    const effect = effectCreator(unit);
    unit.addEffect(effectName, effect);
  });
}

function loadWarrior(
  { name, character, color, maxHealth, abilities, effects, position }: WarriorConfig,
  floor: Floor,
  playerCode?: string,
): void {
  const warrior = new Warrior(name, character, color, maxHealth);
  loadAbilities(warrior, abilities);
  loadEffects(warrior, effects);
  warrior.playTurn = playerCode ? loadPlayer(playerCode) : () => {};
  floor.addWarrior(warrior, position);
}

function loadUnit(
  {
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
  }: UnitConfig,
  floor: Floor,
): void {
  const unit = new Unit(name, character, color, maxHealth, reward, enemy, bound);
  loadAbilities(unit, abilities);
  loadEffects(unit, effects);
  if (playTurn) {
    unit.playTurn = playTurn;
  }
  floor.addUnit(unit, position);
}

function loadLevel(
  { number, description, tip, clue, floor: { size, stairs, warrior, units = [] } }: LevelConfig,
  playerCode?: string,
): Level {
  const { width, height } = size;
  const stairsLocation: [number, number] = [stairs.x, stairs.y];
  const floor = new Floor(width, height, stairsLocation);

  loadWarrior(warrior, floor, playerCode);
  units.forEach((unit) => loadUnit(unit, floor));

  return new Level(number!, description!, tip!, clue!, floor);
}

export default loadLevel;
