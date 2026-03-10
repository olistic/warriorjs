import { expect, test } from 'vitest';

import getFloorMap from './getFloorMap.js';

test('returns the floor map', () => {
  const map = [
    [{ character: 'a' }, { character: 'b' }],
    [{ character: 'c' }, { character: 'd' }],
  ];
  expect(getFloorMap(map)).toBe('ab\ncd');
});
