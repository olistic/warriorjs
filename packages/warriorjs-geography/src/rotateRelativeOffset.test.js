import rotateRelativeOffset from './rotateRelativeOffset';
import { BACKWARD, FORWARD, LEFT, RIGHT } from './relativeDirections';

test('rotates the relative offset in the given direction', () => {
  expect(rotateRelativeOffset([1, 2], FORWARD)).toEqual([1, 2]);
  expect(rotateRelativeOffset([1, 2], RIGHT)).toEqual([-2, 1]);
  expect(rotateRelativeOffset([1, 2], BACKWARD)).toEqual([-1, -2]);
  expect(rotateRelativeOffset([1, 2], LEFT)).toEqual([2, -1]);
});
