import Game from './Game';
import parseArgs from './parseArgs';

/**
 * Starts the game.
 *
 * @param {string[]} args The command line arguments.
 */
async function run(args) {
  const { directory, level, time, yes } = parseArgs(args);
  const game = new Game(directory, level, time, yes);
  await game.start();
}

export { run }; // eslint-disable-line import/prefer-default-export
