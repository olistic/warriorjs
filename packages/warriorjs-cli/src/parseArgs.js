import yargs from 'yargs';

/**
 * Parses the provided args.
 *
 * @param {string[]} args The args no parse.
 *
 * @returns {Object} The parsed args.
 */
function parseArgs(args) {
  return yargs
    .usage('Usage: $0 [options]')
    .options({
      d: {
        alias: 'directory',
        default: '.',
        describe: 'Run under given directory',
        type: 'string',
      },
      l: {
        alias: 'level',
        coerce: arg => {
          const parsed = Number.parseInt(arg, 10);
          if (Number.isNaN(parsed)) {
            throw new Error('Invalid argument: level must be a number');
          }

          return parsed;
        },
        describe: 'Practice level (epic mode only)',
        type: 'number',
      },
      s: {
        alias: 'silent',
        describe: 'Suppress play log',
        type: 'boolean',
      },
      t: {
        alias: 'time',
        coerce: arg => {
          const parsed = Number.parseFloat(arg);
          if (Number.isNaN(parsed)) {
            throw new Error('Invalid argument: time must be a number');
          }

          return parsed;
        },
        default: 0.6,
        describe: 'Delay each turn by seconds',
        type: 'number',
      },
      y: {
        alias: 'yes',
        describe: 'Assume yes in non-destructive confirmation dialogs',
        type: 'boolean',
      },
    })
    .version()
    .help()
    .strict()
    .parse(args);
}

export default parseArgs;
