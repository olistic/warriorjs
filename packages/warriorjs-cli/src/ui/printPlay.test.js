import delay from 'delay';

import printBoard from './printBoard';
import printLogMessage from './printLogMessage';
import printPlay from './printPlay';
import printTurnHeader from './printTurnHeader';

jest.mock('delay');
jest.mock('./printBoard');
jest.mock('./printLevelHeader');
jest.mock('./printLogMessage');
jest.mock('./printTurnHeader');

test('prints turn header on each new turn', async () => {
  const events = [[]];
  await printPlay(events);
  expect(printTurnHeader).toHaveBeenCalledWith(1);
});

test('prints board on each event', async () => {
  const events = [
    [{ floorMap: 'floor1', warriorStatus: 'status1' }],
    [{ floorMap: 'floor2', warriorStatus: 'status2' }],
  ];
  await printPlay(events);
  expect(printBoard).toHaveBeenCalledWith('floor1', 'status1', 0);
  expect(printBoard).toHaveBeenCalledWith('floor2', 'status2', 0);
});

test('prints log message on each event', async () => {
  const events = [[{ unit: 'foo', message: 'bar' }]];
  await printPlay(events);
  expect(printLogMessage).toHaveBeenCalledWith('foo', 'bar');
});

test('starts counting turn from zero and increments on each new turn', async () => {
  const events = [[], []];
  await printPlay(events);
  expect(printTurnHeader).toHaveBeenCalledWith(1);
  expect(printTurnHeader).toHaveBeenCalledWith(2);
});

test('starts counting board offset from zero, increments on each event and resets on each new turn', async () => {
  const events = [
    [{ unit: 'foo', message: 'bar' }, { unit: 'foo', message: 'bar' }],
    [{ unit: 'foo', message: 'bar' }],
    [{ unit: 'foo', message: 'bar' }],
  ];
  await printPlay(events);
  expect(printBoard.mock.calls[0][2]).toBe(0);
  expect(printBoard.mock.calls[1][2]).toBe(1);
  expect(printBoard.mock.calls[2][2]).toBe(0);
  expect(printBoard.mock.calls[3][2]).toBe(0);
});

test('sleeps the specified time at the beginning and after each event', async () => {
  const events = [
    [{ unit: 'foo', message: 'bar' }, { unit: 'foo', message: 'bar' }],
    [{ unit: 'foo', message: 'bar' }],
    [{ unit: 'foo', message: 'bar' }],
  ];
  await printPlay(events, 42);
  expect(delay).toHaveBeenCalledTimes(5);
  expect(delay).toHaveBeenCalledWith(42);
});
