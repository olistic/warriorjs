#!/usr/bin/env node
import { hideBin } from 'yargs/helpers';
import('../lib/cli.js').then(({ run }) => run(hideBin(process.argv)));
