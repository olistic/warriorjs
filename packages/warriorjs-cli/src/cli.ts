import Game from './Game.js';
import parseArgs from './parseArgs.js';

/**
 * Starts the game.
 *
 * @param args The command line arguments.
 */
async function run(args: string[]): Promise<void> {
  try {
    const { directory, level, silent, time, yes } = parseArgs(args);
    const game = new Game(directory, level, silent, time, yes);
    await game.start();
  } catch (err) {
    if (err instanceof Error && err.name === 'ExitPromptError') {
      process.exit(0);
    }

    throw err;
  }
}

export { run };
