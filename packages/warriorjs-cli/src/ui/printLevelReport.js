import getGradeForScore from '../utils/getGradeForScore';
import printLine from './printLine';
import printTotalScore from './printTotalScore';

/**
 * Prints the level report.
 *
 * @param {Profile} profile The profile.
 * @param {Object} playScore The score of the play.
 * @param {number} playScore.warrior The points earned by the warrior.
 * @param {number} playScore.timeBonus The time bonus.
 * @param {number} playScore.clearBonus The clear bonus.
 * @param {number} playScore.total The total score.
 * @param {number} aceScore The level ace score.
 */
function printLevelReport(
  profile,
  { warrior, timeBonus, clearBonus, total },
  aceScore,
) {
  printLine(`Warrior Score: ${warrior}`);
  printLine(`Time Bonus: ${timeBonus}`);
  printLine(`Clear Bonus: ${clearBonus}`);

  if (profile.isEpic()) {
    if (aceScore) {
      printLine(`Level Grade: ${getGradeForScore(total, aceScore)}`);
    }

    printTotalScore(profile.currentEpicScore, total);
  } else {
    printTotalScore(profile.score, total);
  }
}

export default printLevelReport;
