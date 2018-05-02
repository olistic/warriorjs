/**
 * Returns the abilities of the warrior available in the given levels.
 *
 * @param {Object[]} levels The levels to search for abilities.
 *
 * @returns {Object} The warrior abilities.
 */
function getWarriorAbilities(levels) {
  return Object.assign(
    {},
    ...levels.map(level => level.floor.warrior.abilities || {}),
  );
}

export default getWarriorAbilities;
