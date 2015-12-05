import yargs from 'yargs';
import Config from './Config';
import Game from './Game';

export default class Runner {
  _args;
  _stdin;
  _stdout;

  constructor(args, stdin, stdout) {
    this._args = args;
    this._stdin = stdin;
    this._stdout = stdout;
  }

  run() {
    Config.inStream = this._stdin;
    Config.outStream = this._stdout;
    this._parseOptions();
    new Game().start();
  }

  _parseOptions() {
    const argv = yargs
      .usage('Usage: $0 [options]')
      .options({
        d: {
          alias: 'directory',
          describe: 'Run under given directory',
        },
        l: {
          alias: 'level',
          describe: 'Practice level on epic',
        },
        s: {
          alias: 'skip',
          describe: 'Skip user input',
        },
        t: {
          alias: 'time',
          describe: 'Delay each turn by seconds',
        },
      })
      .help('help', 'Show this message')
      .parse(this._args);

    if (argv.directory) {
      Config.pathPrefix = argv.directory;
    }

    if (argv.level) {
      Config.practiceLevel = Number.parseInt(argv.level, 10);
    }

    if (argv.skip) {
      Config.skipInput = argv.skip;
    }

    if (argv.time) {
      Config.delay = Number.parseFloat(argv.time);
    }
  }
}
