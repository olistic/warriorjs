function maxHealth() {
  return unit => ({
    description: 'Return an integer representing your maximum health.',
    perform() {
      return unit.maxHealth;
    },
  });
}

export default maxHealth;
