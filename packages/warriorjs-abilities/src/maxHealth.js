function maxHealth() {
  return unit => ({
    description: 'Returns an integer representing your maximum health.',
    perform() {
      return unit.maxHealth;
    },
  });
}

export default maxHealth;
