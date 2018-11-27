function rest({ healthGain }) {
  const healthGainPercentage = healthGain * 100;
  return unit => ({
    action: true,
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
