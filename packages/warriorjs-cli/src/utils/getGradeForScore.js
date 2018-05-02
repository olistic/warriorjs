import getGradeLetter from './getGradeLetter';

/**
 * Returns grade for score based on ace score.
 *
 * @param {number} score The score to get the grade for.
 * @param {number} aceScore The ace score to base the grade on.
 *
 * @returns {string} The grade letter.
 */
function getGradeForScore(score, aceScore) {
  const percentage = score * 1.0 / aceScore;
  return getGradeLetter(percentage);
}

export default getGradeForScore;
