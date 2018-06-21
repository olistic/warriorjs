import Game from './Game';
import parseArgs from './parseArgs';

/**
 * Starts the game.
 *
 * @param {string[]} args The command line arguments.
 */
async function run(args) {
  const { directory, level, silent, time, yes, noMarkdown } = parseArgs(args);
  const game = new Game(directory, level, silent, time, yes, noMarkdown);
  await game.start();
}

export { run }; // eslint-disable-line import/prefer-default-export
