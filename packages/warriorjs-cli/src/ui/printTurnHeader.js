import printHeader from './printHeader';

/**
 * Prints the turn header.
 *
 * @param {number} turnNumber The turn number.
 */
function printTurnHeader(turnNumber) {
  printHeader(`turn ${String(turnNumber).padStart(3, '0')}`, '-');
}

export default printTurnHeader;
