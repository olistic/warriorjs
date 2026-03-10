interface WarriorConfig {
  name?: string;
  abilities?: Record<string, unknown>;
  [key: string]: unknown;
}

interface FloorConfig {
  warrior: WarriorConfig;
  [key: string]: unknown;
}

interface LevelConfig {
  number?: number;
  floor: FloorConfig;
  [key: string]: unknown;
}

interface Tower {
  levels: LevelConfig[];
  [key: string]: unknown;
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
  tower: Tower,
  levelNumber: number,
  warriorName: string,
  epic: boolean,
): LevelConfig | null {
  const level = tower.levels[levelNumber - 1];
  if (!level) {
    return null;
  }

  const levelConfig = structuredClone(level);

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
  levelConfig.floor.warrior.name = warriorName;
  levelConfig.floor.warrior.abilities = warriorAbilities;
  return levelConfig;
}

export default getLevelConfig;
