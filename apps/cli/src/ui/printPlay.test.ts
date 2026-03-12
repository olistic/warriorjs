import delay from 'delay';
import { expect, test, vi } from 'vitest';

import printBoard from './printBoard.js';
import printLogMessage from './printLogMessage.js';
import printPlay from './printPlay.js';
import printTurnHeader from './printTurnHeader.js';

vi.mock('delay');
vi.mock('./printBoard.js');
vi.mock('./printLevelHeader.js');
vi.mock('./printLogMessage.js');
vi.mock('./printTurnHeader.js');

test('prints turn header on each new turn', async () => {
  const events = [[]] as any;
  await printPlay(events, 0);
  expect(printTurnHeader).toHaveBeenCalledWith(1);
});

test('prints board on each event', async () => {
  const events = [
    [{ floorMap: 'floor1', warriorStatus: 'status1' }],
    [{ floorMap: 'floor2', warriorStatus: 'status2' }],
  ] as any;
  await printPlay(events, 0);
  expect(printBoard).toHaveBeenCalledWith('floor1', 'status1', 0);
  expect(printBoard).toHaveBeenCalledWith('floor2', 'status2', 0);
});

test('prints log message on each event', async () => {
  const events = [[{ unit: 'foo', message: 'bar' }]] as any;
  await printPlay(events, 0);
  expect(printLogMessage).toHaveBeenCalledWith('foo', 'bar');
});

test('starts counting turn from zero and increments on each new turn', async () => {
  const events = [[], []] as any;
  await printPlay(events, 0);
  expect(printTurnHeader).toHaveBeenCalledWith(1);
  expect(printTurnHeader).toHaveBeenCalledWith(2);
});

test('starts counting board offset from zero, increments on each event and resets on each new turn', async () => {
  const events = [
    [
      { unit: 'foo', message: 'bar' },
      { unit: 'foo', message: 'bar' },
    ],
    [{ unit: 'foo', message: 'bar' }],
    [{ unit: 'foo', message: 'bar' }],
  ] as any;
  await printPlay(events, 0);
  expect((printBoard as any).mock.calls[0][2]).toBe(0);
  expect((printBoard as any).mock.calls[1][2]).toBe(1);
  expect((printBoard as any).mock.calls[2][2]).toBe(0);
  expect((printBoard as any).mock.calls[3][2]).toBe(0);
});

test('sleeps the specified time at the beginning and after each event', async () => {
  const events = [
    [
      { unit: 'foo', message: 'bar' },
      { unit: 'foo', message: 'bar' },
    ],
    [{ unit: 'foo', message: 'bar' }],
    [{ unit: 'foo', message: 'bar' }],
  ] as any;
  await printPlay(events, 42);
  expect(delay).toHaveBeenCalledTimes(5);
  expect(delay).toHaveBeenCalledWith(42);
});
