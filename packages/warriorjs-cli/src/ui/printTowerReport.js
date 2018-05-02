import getGradeLetter from '../utils/getGradeLetter';
import printLine from './printLine';

/**
 * Prints the tower report.
 *
 * @param {Profile} profile The profile.
 */
function printTowerReport(profile) {
  const averageGrade = profile.calculateAverageGrade();
  if (!averageGrade) {
    return;
  }

  const averageGradeLetter = getGradeLetter(averageGrade);
  printLine(`Your average grade for this tower is: ${averageGradeLetter}\n`);

  Object.keys(profile.currentEpicGrades)
    .sort()
    .forEach(levelNumber => {
      const grade = getGradeLetter(profile.currentEpicGrades[levelNumber]);
      printLine(`  Level ${levelNumber}: ${grade}`);
    });

  printLine('\nTo practice a level, use the -l option.');
}

export default printTowerReport;
