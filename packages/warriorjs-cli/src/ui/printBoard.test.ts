import { test, expect, vi } from 'vitest';
import ansiEscapes from 'ansi-escapes';

import print from './print.js';
import printBoard from './printBoard.js';
import printFloorMap from './printFloorMap.js';
import printWarriorStatus from './printWarriorStatus.js';

vi.mock('./print.js');
vi.mock('./printFloorMap.js');
vi.mock('./printWarriorStatus.js');

test('prints warrior status and floor map', () => {
  const floorMap = ['row1', 'row2'] as any;
  const warriorStatus = 'status' as any;
  printBoard(floorMap, warriorStatus);
  expect(print).not.toHaveBeenCalled();
  expect(printWarriorStatus).toHaveBeenCalledWith(warriorStatus);
  expect(printFloorMap).toHaveBeenCalledWith(floorMap);
});

test('moves cursor up and down with offset', () => {
  const floorMap = ['row1', 'row2'] as any;
  const warriorStatus = 'status' as any;
  printBoard(floorMap, warriorStatus, 1);
  expect(print).toHaveBeenCalledWith(ansiEscapes.cursorUp(5));
  expect(printWarriorStatus).toHaveBeenCalledWith(warriorStatus);
  expect(printFloorMap).toHaveBeenCalledWith(floorMap);
  expect(print).toHaveBeenCalledWith(ansiEscapes.cursorDown(1));
});
