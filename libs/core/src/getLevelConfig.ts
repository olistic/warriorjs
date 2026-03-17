import type { LevelConfig, TowerDefinition } from './types.js';

function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object' || obj.constructor !== Object) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  const clone = {} as Record<string, unknown>;
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone((obj as Record<string, unknown>)[key]);
  }
  return clone as T;
}

/**
 * Returns the config for the level with the given number.
 *
 * @param tower The tower.
 * @param levelNumber The number of the level.
 * @param warriorName The name of the warrior.
 * @param epic Whether the level is to be used in epic mode or not.
 *
 * @returns The level config.
 */
function getLevelConfig(
  tower: TowerDefinition,
  levelNumber: number,
  warriorName: string,
  epic: boolean,
): LevelConfig | null {
  const level = tower.levels[levelNumber - 1];
  if (!level) {
    return null;
  }

  const levelConfig = deepClone(level) as unknown as LevelConfig;

  const levels = epic ? tower.levels : tower.levels.slice(0, levelNumber);
  const warriorAbilities = Object.assign(
    {},
    ...levels.map(
      ({
        floor: {
          warrior: { abilities },
        },
      }) => abilities || {},
    ),
  );

  levelConfig.number = levelNumber;
  levelConfig.floor.warrior = {
    ...tower.warrior,
    ...levelConfig.floor.warrior,
    name: warriorName,
    abilities: warriorAbilities,
  };
  return levelConfig;
}

export default getLevelConfig;
