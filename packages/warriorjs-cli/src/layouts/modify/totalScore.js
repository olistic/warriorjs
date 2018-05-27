/**
 * Constructs the total score as the sum of the current score and the addition.
 *
 * If the current score is zero, just the addition and not the sum will be
 * printed.
 *
 * @param {number} currentScore The current score.
 * @param {number} addition The score to add to the current score.
 */
function totalScore(currentScore, addition) {
  if (currentScore === 0) {
    return `Total Score: ${addition.toString()}`;
  }
  return `Total Score: ${currentScore} + ${addition} = ${currentScore +
    addition}`;
}

export default totalScore;
