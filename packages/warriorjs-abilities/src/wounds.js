function wounds() {
  return unit => ({
    description: 'Return an array with your wounds.',
    perform() {
      return unit.wounds;
    },
  });
}

export default wounds;
