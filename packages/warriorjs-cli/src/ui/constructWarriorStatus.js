import chalk from 'chalk';

/**
 * Construct a warrior status line.
 *
 * @param {string} warrior The warrior.
 */
function constructWarriorStatus(warrior) {
  const warriorHealth = chalk.redBright(`♥ ${warrior.health}\n`);
  const warriorScore = chalk.yellowBright(`♦ ${warrior.score}`);
  return warriorHealth + warriorScore;
}

export default constructWarriorStatus;
