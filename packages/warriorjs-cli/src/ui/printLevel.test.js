import printFloorMap from './printFloorMap';
import printLevel from './printLevel';
import printLevelDescription from './printLevelDescription';
import printLevelHeader from './printLevelHeader';

jest.mock('./printFloorMap');
jest.mock('./printLevelDescription');
jest.mock('./printLevelHeader');

test('prints level header, description, and floor map', () => {
  const level = {
    number: 1,
    description: 'foo',
    floor: { map: 'map' },
  };
  printLevel(level);
  expect(printLevelHeader).toHaveBeenCalledWith(1);
  expect(printLevelDescription).toHaveBeenCalledWith('foo');
  expect(printFloorMap).toHaveBeenCalledWith('map');
});
