import type { Unit } from './types.js';

function maxHealth() {
  return (unit: Unit) => ({
    description: 'Returns an integer representing your maximum health.',
    perform() {
      return unit.maxHealth;
    },
    meta: {
      params: [],
      returns: 'number' as const,
    },
  });
}

export default maxHealth;
