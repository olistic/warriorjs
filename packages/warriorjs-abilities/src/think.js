function think() {
  return unit => ({
    description:
      'Think about your options before choosing an action (`console.log` replacement).',
    perform(thought) {
      unit.log(`thinks ${thought || 'nothing'}`);
    },
  });
}

export default think;
