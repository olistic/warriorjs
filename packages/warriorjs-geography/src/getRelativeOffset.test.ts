import getRelativeOffset from './getRelativeOffset.js';
import { EAST, NORTH, SOUTH, WEST } from './absoluteDirections.js';

test('returns the relative offset based on location and direction', () => {
  expect(getRelativeOffset([3, 3], [1, 2], NORTH)).toEqual([-1, 2]);
  expect(getRelativeOffset([3, 3], [1, 2], EAST)).toEqual([2, 1]);
  expect(getRelativeOffset([3, 3], [1, 2], SOUTH)).toEqual([1, -2]);
  expect(getRelativeOffset([3, 3], [1, 2], WEST)).toEqual([-2, -1]);
  expect(getRelativeOffset([0, 0], [1, 2], NORTH)).toEqual([2, -1]);
  expect(getRelativeOffset([0, 0], [1, 2], EAST)).toEqual([-1, -2]);
  expect(getRelativeOffset([0, 0], [1, 2], SOUTH)).toEqual([-2, 1]);
  expect(getRelativeOffset([0, 0], [1, 2], WEST)).toEqual([1, 2]);
});
