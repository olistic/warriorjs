import getGradeLetter from '@warriorjs/helper-get-grade-letter';

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
      const grade = profile.currentEpicGrades[levelNumber];
      const gradeLetter = getGradeLetter(grade);
      printLine(`  Level ${levelNumber}: ${gradeLetter}`);
    });

  printLine('\nTo practice a level, use the -l option.');
}

export default printTowerReport;
