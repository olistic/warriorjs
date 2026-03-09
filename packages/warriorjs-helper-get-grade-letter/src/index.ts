/**
 * Returns the letter for the given grade.
 *
 * @param grade The grade.
 * @returns The grade letter.
 */
function getGradeLetter(grade: number): string {
  if (grade >= 1.0) {
    return 'S';
  }

  if (grade >= 0.9) {
    return 'A';
  }

  if (grade >= 0.8) {
    return 'B';
  }

  if (grade >= 0.7) {
    return 'C';
  }

  if (grade >= 0.6) {
    return 'D';
  }

  return 'F';
}

export default getGradeLetter;
