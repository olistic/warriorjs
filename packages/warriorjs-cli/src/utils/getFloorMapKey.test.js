import getFloorMapKey from './getFloorMapKey';

test('returns the floor map key', () => {
  const map = [
    [
      { character: '@', unit: { name: 'Joe', maxHealth: 20 } },
      { character: 'b' },
    ],
    [{ character: 'c' }, { character: '>', stairs: true }],
  ];
  expect(getFloorMapKey(map)).toBe('@ = Joe (20 HP)\n> = stairs');
});
