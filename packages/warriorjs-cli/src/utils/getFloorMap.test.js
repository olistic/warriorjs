import getFloorMap from './getFloorMap';

test('returns the floor map', () => {
  const map = [
    [{ character: 'a' }, { character: 'b' }],
    [{ character: 'c' }, { character: 'd' }],
  ];
  expect(getFloorMap(map)).toBe('ab\ncd');
});
