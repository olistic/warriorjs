import distanceOfCreator from './distanceOf';

describe('distanceOf', () => {
  let distanceOf;
  let unit;

  beforeEach(() => {
    unit = { getDistanceOf: jest.fn() };
    distanceOf = distanceOfCreator()(unit);
  });

  test('is not an action', () => {
    expect(distanceOf.action).toBeUndefined();
  });

  test('has a description', () => {
    expect(distanceOf.description).toBe(
      'Return an integer representing the distance to the given space.',
    );
  });

  describe('performing', () => {
    test('returns distance of specified space', () => {
      unit.getDistanceOf.mockReturnValue(3);
      expect(distanceOf.perform()).toBe(3);
    });
  });
});
