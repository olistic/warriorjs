import ansiEscapes from 'ansi-escapes';

import print from './print';
import printBoard from './printBoard';
import printFloorMap from './printFloorMap';
import printWarriorStatus from './printWarriorStatus';

jest.mock('./print');
jest.mock('./printFloorMap');
jest.mock('./printWarriorStatus');

test('prints warrior status and floor map', () => {
  const floorMap = ['row1', 'row2'];
  const warriorStatus = 'status';
  printBoard(floorMap, warriorStatus);
  expect(print).not.toHaveBeenCalled();
  expect(printWarriorStatus).toHaveBeenCalledWith(warriorStatus);
  expect(printFloorMap).toHaveBeenCalledWith(floorMap);
});

test('moves cursor up and down with offset', () => {
  const floorMap = ['row1', 'row2'];
  const warriorStatus = 'status';
  printBoard(floorMap, warriorStatus, 1);
  expect(print).toHaveBeenCalledWith(ansiEscapes.cursorUp(5));
  expect(printWarriorStatus).toHaveBeenCalledWith(warriorStatus);
  expect(printFloorMap).toHaveBeenCalledWith(floorMap);
  expect(print).toHaveBeenCalledWith(ansiEscapes.cursorDown(1));
});
