import util from 'node:util';

import type { Unit } from './types.js';

function think() {
  return (unit: Unit) => ({
    description: 'Thinks out loud (`console.log` replacement).',
    perform(...args: unknown[]) {
      const thought = args.length > 0 ? util.format(...args) : 'nothing';
      unit.log(`thinks ${thought}`);
    },
    meta: {
      params: [{ name: 'args', type: 'any' as const, rest: true }],
      returns: 'void' as const,
    },
  });
}

export default think;
