import merge from 'lodash.merge';

import getWarriorAbilities from './getWarriorAbilities';

/**
 * Returns the config for the level with the given number.
 *
 * @param {number} levelNumber The number of the level.
 * @param {Profile} profile The profile.
 *
 * @returns {Object} The level config.
 */
function getLevelConfig(levelNumber, profile) {
  const level = profile.tower.getLevel(levelNumber);
  const levels = profile.isEpic()
    ? profile.tower.levels
    : profile.tower.levels.slice(0, levelNumber);
  const abilities = getWarriorAbilities(levels);
  return merge({}, level, {
    towerName: profile.tower.name,
    number: levelNumber,
    floor: {
      warrior: {
        abilities,
        name: profile.warriorName,
      },
    },
  });
}

export default getLevelConfig;
