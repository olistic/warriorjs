/**
 * Returns the size of the screen.
 *
 * @returns {number[]} The size of the screen as an array of [width, height].
 */
function getScreenSize() {
  return [process.stdout.columns, process.stdout.rows];
}

export default getScreenSize;
