/**
 * Returns the grade letter for the given percentage.
 *
 * @param {number} percentage The score percentage.
 *
 * @returns {string} The grade letter.
 */
function getGradeLetter(percentage) {
  if (percentage >= 1.0) {
    return 'S';
  } else if (percentage >= 0.9) {
    return 'A';
  } else if (percentage >= 0.8) {
    return 'B';
  } else if (percentage >= 0.7) {
    return 'C';
  } else if (percentage >= 0.6) {
    return 'D';
  }

  return 'F';
}

export default getGradeLetter;
