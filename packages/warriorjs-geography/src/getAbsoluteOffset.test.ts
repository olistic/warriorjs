import getAbsoluteOffset from './getAbsoluteOffset.js';
import { EAST, NORTH, SOUTH, WEST } from './absoluteDirections.js';

test('returns the absolute offset based on direction', () => {
  expect(getAbsoluteOffset([1, 2], NORTH)).toEqual([2, -1]);
  expect(getAbsoluteOffset([1, 2], EAST)).toEqual([1, 2]);
  expect(getAbsoluteOffset([1, 2], SOUTH)).toEqual([-2, 1]);
  expect(getAbsoluteOffset([1, 2], WEST)).toEqual([-1, -2]);
});
