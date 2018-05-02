import {
  BACKWARD,
  FORWARD,
  LEFT,
  RELATIVE_DIRECTIONS,
  RIGHT,
} from './relativeDirections';

test("exports a FORWARD constant whose value is 'forward'", () => {
  expect(FORWARD).toBe('forward');
});

test("exports a RIGHT constant whose value is 'right'", () => {
  expect(RIGHT).toBe('right');
});

test("exports a BACKWARD constant whose value is 'backward'", () => {
  expect(BACKWARD).toBe('backward');
});

test("exports a LEFT constant whose value is 'left'", () => {
  expect(LEFT).toBe('left');
});

test('exports an array with the relative directions in clockwise order', () => {
  expect(RELATIVE_DIRECTIONS).toEqual([FORWARD, RIGHT, BACKWARD, LEFT]);
});
