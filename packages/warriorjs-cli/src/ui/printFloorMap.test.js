import getUnitStyle from './getUnitStyle';
import printFloorMap from './printFloorMap';
import printLine from './printLine';

jest.mock('./getUnitStyle');
jest.mock('./printLine');

test('prints floor map', () => {
  const style = jest.fn(unit => unit);
  getUnitStyle.mockImplementation(() => style);
  const map = [
    [{ character: 'a' }, { character: 'f', unit: { name: 'foo' } }],
    [{ character: 'b' }, { character: 'c' }],
  ];
  printFloorMap(map);
  expect(getUnitStyle).toHaveBeenCalledWith('foo');
  expect(style).toHaveBeenCalledWith('f');
  expect(printLine).toHaveBeenCalledWith('af\nbc');
});
