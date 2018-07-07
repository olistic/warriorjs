import printFloorMap from './printFloorMap';
import printLevel from './printLevel';
import printLevelHeader from './printLevelHeader';

jest.mock('./printFloorMap');
jest.mock('./printLevelHeader');

test('prints level header, description, and floor map', () => {
  const level = {
    number: 1,
    description: 'foo',
    floorMap: 'map',
  };
  printLevel(level);
  expect(printLevelHeader).toHaveBeenCalledWith(1);
  expect(printFloorMap).toHaveBeenCalledWith('map');
});
