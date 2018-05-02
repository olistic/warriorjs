function rest({ healthGain }) {
  const healthGainPercentage = healthGain * 100;
  return unit => ({
    action: true,
    description: `Gain ${healthGainPercentage}% of max health back, but do nothing more.`,
    perform() {
      if (unit.health < unit.maxHealth) {
        unit.say('rests');
        const amount = Math.round(unit.maxHealth * healthGain);
        unit.heal(amount);
      } else {
        unit.say('is already fit as a fiddle');
      }
    },
  });
}

export default rest;
