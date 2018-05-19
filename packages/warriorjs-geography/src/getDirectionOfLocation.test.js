import getDirectionOfLocation from './getDirectionOfLocation';
import { EAST, NORTH, SOUTH, WEST } from './absoluteDirections';

test('returns the direction from a given location to another given location', () => {
  expect(getDirectionOfLocation([1, 1], [1, 2])).toEqual(NORTH);
  expect(getDirectionOfLocation([2, 2], [1, 2])).toEqual(EAST);
  expect(getDirectionOfLocation([1, 3], [1, 2])).toEqual(SOUTH);
  expect(getDirectionOfLocation([0, 2], [1, 2])).toEqual(WEST);
});
