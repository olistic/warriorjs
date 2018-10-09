function health() {
  return unit => ({
    description: 'Returns an integer representing your health.',
    perform() {
      return unit.health;
    },
  });
}

export default health;
