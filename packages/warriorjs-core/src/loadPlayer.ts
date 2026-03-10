import assert from 'assert';
import vm from 'vm';

const playerCodeFilename = 'Player.js';
const playerCodeTimeout = 3000;

function loadPlayer(playerCode: string): (turn: any) => void {
  const sandbox = vm.createContext();

  // Do not collect stack frames for errors in the player code.
  vm.runInContext('Error.stackTraceLimit = 0;', sandbox);

  try {
    vm.runInContext(playerCode, sandbox, {
      filename: playerCodeFilename,
      timeout: playerCodeTimeout,
    });
  } catch (err: any) {
    const error: any = new Error(`Check your syntax and try again!\n\n${err.stack}`);
    error.code = 'InvalidPlayerCode';
    throw error;
  }

  try {
    const player: any = vm.runInContext('new Player();', sandbox, {
      timeout: playerCodeTimeout,
    });
    assert(typeof player.playTurn === 'function', 'playTurn is not defined');
    const playTurn = (turn: any): void => {
      try {
        player.playTurn(turn);
      } catch (err: any) {
        const error: any = new Error(err.message);
        error.code = 'InvalidPlayerCode';
        throw error;
      }
    };
    return playTurn;
  } catch (err: any) {
    if (err.message === 'Player is not defined') {
      const error: any = new Error('You must define a Player class!');
      error.code = 'InvalidPlayerCode';
      throw error;
    } else if (err.message === 'playTurn is not defined') {
      const error: any = new Error(
        'Your Player class must define a playTurn method!',
      );
      error.code = 'InvalidPlayerCode';
      throw error;
    }

    throw err;
  }
}

export default loadPlayer;
