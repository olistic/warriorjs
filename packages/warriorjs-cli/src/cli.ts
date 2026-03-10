import Game from './Game.js';
import parseArgs from './parseArgs.js';

/**
 * Starts the game.
 *
 * @param args The command line arguments.
 */
async function run(args: string[]): Promise<void> {
  const { directory, level, silent, time, yes } = parseArgs(args);
  const game = new Game(directory, level, silent, time, yes);
  await game.start();
}

export { run };
