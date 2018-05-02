import vm from 'vm';
import assert from 'assert';

import PlayerError from './PlayerError';

const playerCodeFile = 'Player.js';
const playerCodeTimeout = 3000;

class PlayerLoader {
  constructor() {
    this.sandbox = vm.createContext();
  }

  load(playerCode) {
    this.definePlayer(playerCode);
    return this.createPlayer();
  }

  definePlayer(playerCode) {
    try {
      // Do not collect stack frames for syntax errors in the player code.
      Error.stackTraceLimit = 0;
      vm.runInContext(playerCode, this.sandbox, {
        filename: playerCodeFile,
        timeout: playerCodeTimeout,
      });
    } catch (err) {
      throw new PlayerError(
        `Invalid submitted code. Check your syntax and try again!\n\n${
          err.stack
        }`,
      );
    } finally {
      // Restore stack trace limit.
      Error.stackTraceLimit = 10;
    }
  }

  createPlayer() {
    try {
      const player = vm.runInContext('new Player();', this.sandbox, {
        timeout: playerCodeTimeout,
      });
      assert(typeof player.playTurn === 'function', 'playTurn is not defined');
      return player;
    } catch (err) {
      if (err.message === 'Player is not defined') {
        throw new PlayerError(
          'Invalid submitted code. You must define a Player class!',
        );
      } else if (err.message === 'playTurn is not defined') {
        throw new PlayerError(
          'Invalid submitted code. Your Player class must define a playTurn method!',
        );
      }

      throw new PlayerError(`Invalid submitted code: ${err.message}`);
    }
  }
}

export default PlayerLoader;
