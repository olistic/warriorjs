import getGradeLetter from '@warriorjs/helper-get-grade-letter';

import printLine from './printLine';
import printTotalScore from './printTotalScore';

/**
 * Prints the level report.
 *
 * @param {Profile} profile The profile.
 * @param {Object} scoreParts The score components.
 * @param {number} scoreParts.warrior The points earned by the warrior.
 * @param {number} scoreParts.timeBonus The time bonus.
 * @param {number} scoreParts.clearBonus The clear bonus.
 * @param {number} totalScore The total score.
 * @param {number} grade The grade.
 */
function printLevelReport(
  profile,
  { warrior: warriorScore, timeBonus, clearBonus },
  totalScore,
  grade,
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
