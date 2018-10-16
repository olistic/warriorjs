import isFloorClear from './isFloorClear';

test('considers clear when there are no units other than the warrior', () => {
  const floorMap = [
    [{ character: 'a' }, { character: 'b' }],
    [{ character: '@', unit: 'warrior' }, { character: 'c' }],
  ];
  expect(isFloorClear(floorMap)).toBe(true);
});

test("doesn't consider clear when there are other units apart from the warrior", () => {
  const floorMap = [
    [{ character: 'a' }, { character: 'b' }],
    [{ character: '@', unit: 'warrior' }, { character: 'f', unit: 'foo' }],
  ];
  expect(isFloorClear(floorMap)).toBe(false);
});
