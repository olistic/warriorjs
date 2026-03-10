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
        unit.log('is already fit as a fiddle');
      }
    },
  });
}

export default rest;
