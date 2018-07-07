import chalk from 'chalk';

const unitStyles = [
  chalk.cyan,
  chalk.magenta,
  chalk.red,
  chalk.yellow,
  chalk.green,
  chalk.blue,
];

/**
 * Returns the style for the given unit.
 *
 * @param {string} unitName The name of the unit to get the style for.
 *
 * @returns {Function} The style function.
 */
function getUnitStyle(unitName) {
  return unitStyles[unitName.charCodeAt(0) % unitStyles.length];
}

export default getUnitStyle;
