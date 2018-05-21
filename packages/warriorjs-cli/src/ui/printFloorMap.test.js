import getUnitStyle from './getUnitStyle';
import printFloorMap from './printFloorMap';
import printLine from './printLine';

jest.mock('./getUnitStyle');
jest.mock('./printLine');

test('prints floor map', () => {
  const unitStyle = jest.fn(string => string);
  getUnitStyle.mockReturnValue(unitStyle);
  const map = [
    [{ character: 'a' }, { character: 'b', unit: 'unit' }],
    [{ character: 'c' }, { character: 'd' }],
  ];
  printFloorMap(map);
  expect(getUnitStyle).toHaveBeenCalledWith('unit');
  expect(unitStyle).toHaveBeenCalledWith('b');
  expect(printLine).toHaveBeenCalledWith('ab\ncd');
});
