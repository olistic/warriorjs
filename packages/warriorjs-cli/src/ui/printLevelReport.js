import getGradeForScore from '../utils/getGradeForScore';
import printLine from './printLine';
import printTotalScore from './printTotalScore';

/**
 * Prints the level report.
 *
 * @param {Profile} profile The profile.
 * @param {Object} playScore The score of the play.
 * @param {number} playScore.warriorScore The points earned by the warrior.
 * @param {number} playScore.timeBonus The time bonus.
 * @param {number} playScore.clearBonus The clear bonus.
 * @param {number} aceScore The level ace score.
 */
function printLevelReport(
  profile,
  { warriorScore, timeBonus, clearBonus },
  aceScore,
) {
  printLine(`Warrior Score: ${warriorScore}`);
  printLine(`Time Bonus: ${timeBonus}`);
  printLine(`Clear Bonus: ${clearBonus}`);

  const totalScore = warriorScore + timeBonus + clearBonus;
  if (profile.isEpic()) {
    if (aceScore) {
      printLine(`Level Grade: ${getGradeForScore(totalScore, aceScore)}`);
    }

    printTotalScore(profile.currentEpicScore, totalScore);
  } else {
    printTotalScore(profile.score, totalScore);
  }
}

export default printLevelReport;
