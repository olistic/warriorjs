/**
 * Returns grade for score based on ace score.
 *
 * @param {number} score The score to get the grade for.
 * @param {number} aceScore The ace score to base the grade on.
 *
 * @returns {number} The grade.
 */
function getGradeForScore(score, aceScore) {
  return (score * 1.0) / aceScore;
}

export default getGradeForScore;
