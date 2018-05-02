import { EAST, NORTH, SOUTH, WEST } from './absoluteDirections';
import getAbsoluteOffset from './getAbsoluteOffset';

test('returns the absolute offset based on orientation', () => {
  expect(getAbsoluteOffset([1, 2], NORTH)).toEqual([2, -1]);
  expect(getAbsoluteOffset([1, 2], EAST)).toEqual([1, 2]);
  expect(getAbsoluteOffset([1, 2], SOUTH)).toEqual([-2, 1]);
  expect(getAbsoluteOffset([1, 2], WEST)).toEqual([-1, -2]);
});
