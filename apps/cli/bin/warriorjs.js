#!/usr/bin/env node

import { hideBin } from 'yargs/helpers';

import('../dist/cli.js').then(({ run }) => run(hideBin(process.argv)));
