import type { Unit } from './types.js';

function rest({ healthGain }: { healthGain: number }) {
  const healthGainPercentage = healthGain * 100;
  return (unit: Unit) => ({
    action: true as const,
    description: `Gains ${healthGainPercentage}% of max health back, but does nothing more.`,
    perform() {
      if (unit.health < unit.maxHealth) {
        unit.log('rests');
        const amount = Math.round(unit.maxHealth * healthGain);
        unit.heal(amount);
      } else {
        unit.log('has nothing to heal');
      }
    },
    meta: {
      params: [],
      returns: 'void' as const,
    },
  });
}

export default rest;
