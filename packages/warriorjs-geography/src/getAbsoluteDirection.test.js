import getAbsoluteDirection from './getAbsoluteDirection';
import { BACKWARD, FORWARD, LEFT, RIGHT } from './relativeDirections';
import { EAST, NORTH, SOUTH, WEST } from './absoluteDirections';

let direction;

describe('forward', () => {
  beforeEach(() => {
    direction = FORWARD;
  });

  test('is to the north when facing north', () => {
    expect(getAbsoluteDirection(direction, NORTH)).toBe(NORTH);
  });

  test('is to the east when facing east', () => {
    expect(getAbsoluteDirection(direction, EAST)).toBe(EAST);
  });

  test('is to the south when facing south', () => {
    expect(getAbsoluteDirection(direction, SOUTH)).toBe(SOUTH);
  });

  test('is to the west when facing west', () => {
    expect(getAbsoluteDirection(direction, WEST)).toBe(WEST);
  });
});

describe('right', () => {
  beforeEach(() => {
    direction = RIGHT;
  });

  test('is to the east when facing north', () => {
    expect(getAbsoluteDirection(direction, NORTH)).toBe(EAST);
  });

  test('is to the south when facing east', () => {
    expect(getAbsoluteDirection(direction, EAST)).toBe(SOUTH);
  });

  test('is to the west when facing south', () => {
    expect(getAbsoluteDirection(direction, SOUTH)).toBe(WEST);
  });

  test('is to the north when facing west', () => {
    expect(getAbsoluteDirection(direction, WEST)).toBe(NORTH);
  });
});

describe('backward', () => {
  beforeEach(() => {
    direction = BACKWARD;
  });

  test('is to the south when facing north', () => {
    expect(getAbsoluteDirection(direction, NORTH)).toBe(SOUTH);
  });

  test('is to the west when facing east', () => {
    expect(getAbsoluteDirection(direction, EAST)).toBe(WEST);
  });

  test('is to the north when facing south', () => {
    expect(getAbsoluteDirection(direction, SOUTH)).toBe(NORTH);
  });

  test('is to the east when facing west', () => {
    expect(getAbsoluteDirection(direction, WEST)).toBe(EAST);
  });
});

describe('left', () => {
  beforeEach(() => {
    direction = LEFT;
  });

  test('is to the west when facing north', () => {
    expect(getAbsoluteDirection(direction, NORTH)).toBe(WEST);
  });

  test('is to the north when facing east', () => {
    expect(getAbsoluteDirection(direction, EAST)).toBe(NORTH);
  });

  test('is to the east when facing south', () => {
    expect(getAbsoluteDirection(direction, SOUTH)).toBe(EAST);
  });

  test('is to the south when facing west', () => {
    expect(getAbsoluteDirection(direction, WEST)).toBe(SOUTH);
  });
});
