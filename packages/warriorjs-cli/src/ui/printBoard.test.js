import ansiEscapes from 'ansi-escapes';

import print from './print';
import printBoard from './printBoard';
import printFloorMap from './printFloorMap';
import printWarriorStatus from './printWarriorStatus';

jest.mock('./print');
jest.mock('./printFloorMap');
jest.mock('./printWarriorStatus');

test('prints warrior status and floor map', () => {
  const floor = {
    map: {},
    warrior: {},
  };
  printBoard(floor);
  expect(print).not.toHaveBeenCalled();
  expect(printWarriorStatus).toHaveBeenCalledWith(floor.warrior);
  expect(printFloorMap).toHaveBeenCalledWith(floor.map);
});

test('moves cursor up and down with offset', () => {
  const floor = {
    map: { length: 1 },
    warrior: {},
  };
  printBoard(floor, 1);
  expect(print).toHaveBeenCalledWith(ansiEscapes.cursorUp(4));
  expect(printWarriorStatus).toHaveBeenCalledWith(floor.warrior);
  expect(printFloorMap).toHaveBeenCalledWith(floor.map);
  expect(print).toHaveBeenCalledWith(ansiEscapes.cursorDown(1));
});
