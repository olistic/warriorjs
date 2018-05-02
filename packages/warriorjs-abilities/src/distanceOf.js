function distanceOf() {
  return unit => ({
    description:
      'Return an integer representing the distance to the given space.',
    perform(space) {
      return unit.getDistanceOf(space);
    },
  });
}

export default distanceOf;
