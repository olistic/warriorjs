import translateLocation from './translateLocation';

test('translates the given location by the given offset', () => {
  expect(translateLocation([1, 2], [2, -1])).toEqual([3, 1]);
});
