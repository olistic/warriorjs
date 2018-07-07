import chalk from 'chalk';

// Downsample colors from RGB to 256 color ANSI for greater uniformity.
const ctx = new chalk.constructor({ level: 2 });

/**
 * Returns the style for the given unit.
 *
 * @param {Object} unit The unit to get the style for.
 * @param {string} unit.color The color of the unit (hex).
 *
 * @returns {Function} The style function.
 */
function getUnitStyle({ color }) {
  return ctx.hex(color);
}

export default getUnitStyle;
