import verifyRelativeDirection from './verifyRelativeDirection';
import {
  BACKWARD,
  FORWARD,
  LEFT,
  RELATIVE_DIRECTIONS,
  RIGHT,
} from './relativeDirections';

test("doesn't throw if direction is valid", () => {
  const validDirections = RELATIVE_DIRECTIONS;
  validDirections.forEach(validDirection =>
    verifyRelativeDirection(validDirection),
  );
});

test('throws an error if direction is not valid', () => {
  const invalidDirections = ['', 'foo', 'forward\n', 'Forward', 'backwards'];
  invalidDirections.forEach(invalidDirection => {
    expect(() => {
      verifyRelativeDirection(invalidDirection);
    }).toThrow(
      `Unknown direction: '${invalidDirection}'. Should be one of: '${FORWARD}', '${RIGHT}', '${BACKWARD}' or '${LEFT}'.`,
    );
  });
});
