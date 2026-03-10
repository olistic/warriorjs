import printLine from './printLine.js';

function printTotalScore(currentScore: number, addition: number): void {
  if (currentScore === 0) {
    printLine(`Total Score: ${addition.toString()}`);
  } else {
    printLine(
      `Total Score: ${currentScore} + ${addition} = ${currentScore + addition}`,
    );
  }
}

export default printTotalScore;
