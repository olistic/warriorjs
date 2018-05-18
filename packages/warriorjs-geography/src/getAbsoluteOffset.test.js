import getAbsoluteOffset from './getAbsoluteOffset';
import { EAST, NORTH, SOUTH, WEST } from './absoluteDirections';

test('returns the absolute offset based on direction', () => {
  expect(getAbsoluteOffset([1, 2], NORTH)).toEqual([2, -1]);
  expect(getAbsoluteOffset([1, 2], EAST)).toEqual([1, 2]);
  expect(getAbsoluteOffset([1, 2], SOUTH)).toEqual([-2, 1]);
  expect(getAbsoluteOffset([1, 2], WEST)).toEqual([-1, -2]);
});
