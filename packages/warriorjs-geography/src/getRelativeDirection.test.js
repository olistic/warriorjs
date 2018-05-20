import getRelativeDirection from './getRelativeDirection';
import { BACKWARD, FORWARD, LEFT, RIGHT } from './relativeDirections';
import { EAST, NORTH, SOUTH, WEST } from './absoluteDirections';

let direction;

describe('north', () => {
  beforeEach(() => {
    direction = NORTH;
  });

  test('is forward when facing north', () => {
    expect(getRelativeDirection(direction, NORTH)).toBe(FORWARD);
  });

  test('is to the left when facing east', () => {
    expect(getRelativeDirection(direction, EAST)).toBe(LEFT);
  });

  test('is backward when facing south', () => {
    expect(getRelativeDirection(direction, SOUTH)).toBe(BACKWARD);
  });

  test('is to the right when facing west', () => {
    expect(getRelativeDirection(direction, WEST)).toBe(RIGHT);
  });
});

describe('east', () => {
  beforeEach(() => {
    direction = EAST;
  });

  test('is to the right when facing north', () => {
    expect(getRelativeDirection(direction, NORTH)).toBe(RIGHT);
  });

  test('is forward when facing east', () => {
    expect(getRelativeDirection(direction, EAST)).toBe(FORWARD);
  });

  test('is to the left when facing south', () => {
    expect(getRelativeDirection(direction, SOUTH)).toBe(LEFT);
  });

  test('is backward when facing west', () => {
    expect(getRelativeDirection(direction, WEST)).toBe(BACKWARD);
  });
});

describe('south', () => {
  beforeEach(() => {
    direction = SOUTH;
  });

  test('is backward when facing north', () => {
    expect(getRelativeDirection(direction, NORTH)).toBe(BACKWARD);
  });

  test('is to the right when facing east', () => {
    expect(getRelativeDirection(direction, EAST)).toBe(RIGHT);
  });

  test('is forward when facing south', () => {
    expect(getRelativeDirection(direction, SOUTH)).toBe(FORWARD);
  });

  test('is to the left when facing west', () => {
    expect(getRelativeDirection(direction, WEST)).toBe(LEFT);
  });
});

describe('west', () => {
  beforeEach(() => {
    direction = WEST;
  });

  test('is to the left when facing north', () => {
    expect(getRelativeDirection(direction, NORTH)).toBe(LEFT);
  });

  test('is backward when facing east', () => {
    expect(getRelativeDirection(direction, EAST)).toBe(BACKWARD);
  });

  test('is to the right when facing south', () => {
    expect(getRelativeDirection(direction, SOUTH)).toBe(RIGHT);
  });

  test('is forward when facing west', () => {
    expect(getRelativeDirection(direction, WEST)).toBe(FORWARD);
  });
});
