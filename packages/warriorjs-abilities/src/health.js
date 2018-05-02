function health() {
  return unit => ({
    description: 'Return an integer representing your health.',
    perform() {
      return unit.health;
    },
  });
}

export default health;
