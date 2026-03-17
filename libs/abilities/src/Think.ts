import util from 'node:util';

import { Sense } from '@warriorjs/core';
import type { AbilityMeta } from './types.js';

class Think extends Sense {
  readonly description = 'Thinks out loud (`console.log` replacement).';
  readonly meta: AbilityMeta = {
    params: [{ name: 'args', type: 'any', rest: true }],
    returns: 'void',
  };

  perform(...args: unknown[]) {
    const thought = args.length > 0 ? util.format(...args) : 'nothing';
    this.unit.log(`thinks ${thought}`);
  }
}

export default Think;
