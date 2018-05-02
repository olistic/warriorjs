import {
  ABSOLUTE_DIRECTIONS,
  EAST,
  NORTH,
  SOUTH,
  WEST,
} from './absoluteDirections';

test("exports a NORTH constant whose value is 'north'", () => {
  expect(NORTH).toBe('north');
});

test("exports a EAST constant whose value is 'east'", () => {
  expect(EAST).toBe('east');
});

test("exports a SOUTH constant whose value is 'south'", () => {
  expect(SOUTH).toBe('south');
});

test("exports a WEST constant whose value is 'west'", () => {
  expect(WEST).toBe('west');
});

test('exports an array with the absolute directions in clockwise order', () => {
  expect(ABSOLUTE_DIRECTIONS).toEqual([NORTH, EAST, SOUTH, WEST]);
});
