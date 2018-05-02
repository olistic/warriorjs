import getUnitStyle from './getUnitStyle';
import printFloorMap from './printFloorMap';
import printLine from './printLine';

jest.mock('./getUnitStyle');
jest.mock('./printLine');

test('prints floor map', () => {
  const style = jest.fn(unit => unit);
  getUnitStyle.mockImplementation(() => style);
  const map = [
    [{ character: 'a' }, { character: 'b', unit: 'unit' }],
    [{ character: 'c' }, { character: 'd' }],
  ];
  printFloorMap(map);
  expect(getUnitStyle).toHaveBeenCalledWith('unit');
  expect(style).toHaveBeenCalledWith('b');
  expect(printLine).toHaveBeenCalledWith('ab\ncd');
});
