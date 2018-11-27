import cloneDeep from 'lodash.clonedeep';

/**
 * Returns the config for the level with the given number.
 *
 * @param {Object} tower The tower.
 * @param {number} levelNumber The number of the level.
 * @param {string} warriorName The name of the warrior.
 * @param {boolean} epic Whether the level is to be used in epic mode or not.
 *
 * @returns {Object} The level config.
 */
function getLevelConfig(tower, levelNumber, warriorName, epic) {
  const level = tower.levels[levelNumber - 1];
  if (!level) {
    return null;
  }

  const levelConfig = cloneDeep(level);

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
