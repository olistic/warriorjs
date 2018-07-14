/**
 * Returns the letter for the given grade.
 *
 * @param {number} grade The grade.
 *
 * @returns {string} The grade letter.
 */
function getGradeLetter(grade) {
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
