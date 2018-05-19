import verifyAbsoluteDirection from './verifyAbsoluteDirection';
import {
  ABSOLUTE_DIRECTIONS,
  EAST,
  NORTH,
  SOUTH,
  WEST,
} from './absoluteDirections';

test("doesn't throw if direction is valid", () => {
  const validDirections = ABSOLUTE_DIRECTIONS;
  validDirections.forEach(validDirection =>
    verifyAbsoluteDirection(validDirection),
  );
});

test('throws an error if direction is not valid', () => {
  const invalidDirections = ['', 'foo', 'north\n', 'North', 'southern'];
  invalidDirections.forEach(invalidDirection => {
    expect(() => {
      verifyAbsoluteDirection(invalidDirection);
    }).toThrow(
      `Unknown direction: '${invalidDirection}'. Should be one of: '${NORTH}', '${EAST}', '${SOUTH}' or '${WEST}'.`,
    );
  });
});
