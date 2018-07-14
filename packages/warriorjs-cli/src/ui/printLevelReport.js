import getGradeLetter from '@warriorjs/helper-get-grade-letter';

import printLine from './printLine';
import printTotalScore from './printTotalScore';

/**
 * Prints the level report.
 *
 * @param {Profile} profile The profile.
 * @param {Object} score The score of the play.
 * @param {number} score.warrior The points earned by the warrior.
 * @param {number} score.timeBonus The time bonus.
 * @param {number} score.clearBonus The clear bonus.
 * @param {number} score.total The total score.
 */
function printLevelReport(
  profile,
  {
    parts: { warrior: warriorScore, timeBonus, clearBonus },
    total: totalScore,
    grade,
  },
) {
  printLine(`Warrior Score: ${warriorScore}`);
  printLine(`Time Bonus: ${timeBonus}`);
  printLine(`Clear Bonus: ${clearBonus}`);

  if (profile.isEpic()) {
    printLine(`Level Grade: ${getGradeLetter(grade)}`);
    printTotalScore(profile.currentEpicScore, totalScore);
  } else {
    printTotalScore(profile.score, totalScore);
  }
}

export default printLevelReport;
