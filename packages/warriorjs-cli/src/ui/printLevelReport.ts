import { getGradeLetter } from '@warriorjs/scoring';

import printLine from './printLine.js';
import printTotalScore from './printTotalScore.js';

interface ScoreParts {
  warrior: number;
  timeBonus: number;
  clearBonus: number;
}

interface ProfileLike {
  isEpic(): boolean;
  currentEpicScore: number;
  score: number;
}

function printLevelReport(
  profile: ProfileLike,
  { warrior: warriorScore, timeBonus, clearBonus }: ScoreParts,
  totalScore: number,
  grade: number,
): void {
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
