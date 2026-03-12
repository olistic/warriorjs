import type { Unit } from './types.js';

function health() {
  return (unit: Unit) => ({
    description: 'Returns an integer representing your health.',
    perform() {
      return unit.health;
    },
    meta: {
      params: [],
      returns: 'number' as const,
    },
  });
}

export default health;
