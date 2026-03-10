import { expect, test } from 'vitest';
import getDistanceOfLocation from './getDistanceOfLocation.js';

test('returns the distance between the two given locations', () => {
  expect(getDistanceOfLocation([5, 3], [1, 2])).toBe(5);
  expect(getDistanceOfLocation([4, 2], [1, 2])).toBe(3);
});
