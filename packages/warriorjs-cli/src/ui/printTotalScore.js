import printLine from './printLine';

/**
 * Prints the total score as the sum of the current score and the addition.
 *
 * If the current score is zero, just the addition and not the sum will be
 * printed.
 *
 * @param {number} currentScore The current score.
 * @param {number} addition The score to add to the current score.
 */
function printTotalScore(currentScore, addition) {
  if (currentScore === 0) {
    printLine(`Total Score: ${addition.toString()}`);
  } else {
    printLine(
      `Total Score: ${currentScore} + ${addition} = ${currentScore + addition}`,
    );
  }
}

export default printTotalScore;
