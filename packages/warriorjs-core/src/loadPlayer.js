import assert from 'assert';
import vm from 'vm';

const playerCodeFilename = 'Player.js';
const playerCodeTimeout = 3000;

/**
 * Loads the player code and returns the playTurn function.
 *
 * @param {string} playerCode The code of the player.
 *
 * @returns {Function} The playTurn function.
 */
function loadPlayer(playerCode) {
  const sandbox = vm.createContext();

  // Do not collect stack frames for errors in the player code.
  vm.runInContext('Error.stackTraceLimit = 0;', sandbox);

  try {
    vm.runInContext(playerCode, sandbox, {
      filename: playerCodeFilename,
      timeout: playerCodeTimeout,
    });
  } catch (err) {
    throw new Error(
      `Invalid Player code. Check your syntax and try again!\n\n${err.stack}`,
    );
  }

  try {
    const player = vm.runInContext('new Player();', sandbox, {
      timeout: playerCodeTimeout,
    });
    assert(typeof player.playTurn === 'function', 'playTurn is not defined');
    const playTurn = turn => {
      try {
        player.playTurn(turn);
      } catch (err) {
        throw new Error(`Invalid Player code: ${err.message}`);
      }
    };
    return playTurn;
  } catch (err) {
    if (err.message === 'Player is not defined') {
      throw new Error('Invalid Player code. You must define a Player class!');
    } else if (err.message === 'playTurn is not defined') {
      throw new Error(
        'Invalid Player code. Your Player class must define a playTurn method!',
      );
    }

    throw new Error(`Invalid Player code: ${err.message}`);
  }
}

export default loadPlayer;
