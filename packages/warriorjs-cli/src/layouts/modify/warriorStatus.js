import chalk from 'chalk';

/**
 * Construct the warrior status.
 *
 * @param {string} warrior The warrior.
 */
function warriorStatus(warrior) {
  const warriorHealth = chalk.redBright(`♥ ${warrior.health}\n`);
  const warriorScore = chalk.yellowBright(`♦ ${warrior.score}`);
  return [warriorHealth, warriorScore].join('\n');
}

export default warriorStatus;
