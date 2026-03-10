import { test, expect } from 'vitest';

import getFloorMapKey from './getFloorMapKey.js';

test('returns the floor map key', () => {
  const map = [
    [
      { character: '@', unit: { name: 'Joe', maxHealth: 20 } },
      { character: 'b' },
    ],
    [{ character: 'c' }],
  ];
  expect(getFloorMapKey(map as any)).toBe('@ = Joe (20 HP)\n> = stairs');
});
