import chalk from 'chalk';

import getGradeForScore from '../../utils/getGradeForScore';
import totalScore from './totalScore';

/**
 * Constructs the level report.
 *
 * @param {Profile} profile The profile.
 * @param {Object} playScore The score of the play.
 * @param {number} playScore.warriorScore The points earned by the warrior.
 * @param {number} playScore.timeBonus The time bonus.
 * @param {number} playScore.clearBonus The clear bonus.
 * @param {number} aceScore The level ace score.
 */
function levelReport(
  profile,
  { warriorScore, timeBonus, clearBonus },
  aceScore,
) {
  const lines = [];

  lines.push(`${chalk.gray.dim('>')} Warrior Score: ${warriorScore}`);
  lines.push(`${chalk.gray.dim('>')} Time Bonus: ${timeBonus}`);
  lines.push(`${chalk.gray.dim('>')} Clear Bonus: ${clearBonus}`);

  const score = warriorScore + timeBonus + clearBonus;
  if (profile.isEpic()) {
    if (aceScore) {
      lines.push(
        `${chalk.gray.dim('>')} Level Grade: ${getGradeForScore(
          score,
          aceScore,
        )}`,
      );
    }

    lines.push(
      `${chalk.gray.dim('>')} ${totalScore(profile.currentEpicScore, score)}`,
    );
  } else {
    lines.push(`${chalk.gray.dim('>')} ${totalScore(profile.score, score)}`);
  }

  return lines.join('\n');
}

export default levelReport;
