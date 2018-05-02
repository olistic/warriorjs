import chalk from 'chalk';

const warriorStyle = chalk.cyan;
const unitStyles = [
  chalk.magenta,
  chalk.red,
  chalk.yellow,
  chalk.green,
  chalk.blue,
];

/**
 * Returns the style for the given unit.
 *
 * @param {Object} unit The unit to get the style for.
 * @param {string} unit.character The character that represents the unit.
 * @param {boolean} unit.warrior Whether the unit is the warrior or not.
 *
 * @returns {Function} The style function.
 */
function getUnitStyle({ character, warrior }) {
  if (warrior) {
    return warriorStyle;
  }

  return unitStyles[character.charCodeAt(0) % unitStyles.length];
}

export default getUnitStyle;
