import getGradeLetter from '../../utils/getGradeLetter';

/**
 * Prints the tower report.
 *
 * @param {Profile} profile The profile.
 */
function towerReport(profile) {
  const lines = [];

  const averageGrade = profile.calculateAverageGrade();
  if (!averageGrade) {
    return;
  }

  const averageGradeLetter = getGradeLetter(averageGrade);
  lines.push(`Your average grade for this tower is: ${averageGradeLetter}\n`);

  Object.keys(profile.currentEpicGrades)
    .sort()
    .forEach(levelNumber => {
      const grade = getGradeLetter(profile.currentEpicGrades[levelNumber]);
      lines.push(`  Level ${levelNumber}: ${grade}`);
    });

  lines.push('\nTo practice a level, use the -l option.');
}

export default towerReport;
