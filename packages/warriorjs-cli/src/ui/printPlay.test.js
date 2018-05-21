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

test('starts counting turn from zero and increments on each TURN event', async () => {
  const events = [{ type: 'TURN' }, { type: 'TURN' }];
  await printPlay(1, events);
  expect(printTurnHeader).toHaveBeenCalledWith(1);
  expect(printTurnHeader).toHaveBeenCalledWith(2);
});

test('starts counting board offset from zero, increments on each UNIT event with message and resets on each TURN event', async () => {
  const events = [
    { type: 'TURN' },
    { type: 'UNIT', message: 'is awesome!' },
    { type: 'UNIT' },
    { type: 'TURN' },
  ];
  await printPlay(1, events);
  expect(printBoard.mock.calls[0][1]).toBe(0);
  expect(printBoard.mock.calls[1][1]).toBe(1);
  expect(printBoard.mock.calls[2][1]).toBe(1);
  expect(printBoard.mock.calls[3][1]).toBe(0);
});

test('prints turn header on each TURN event', async () => {
  const events = [{ type: 'TURN' }];
  await printPlay(1, events);
  expect(printTurnHeader).toHaveBeenCalledWith(1);
});

test('prints log message on each UNIT event that has a message', async () => {
  const events = [{ type: 'UNIT', message: 'is awesome!', unit: 'unit' }];
  await printPlay(1, events);
  expect(printLogMessage).toHaveBeenCalledWith('unit', 'is awesome!');
});

test('prints board on each event', async () => {
  const events = [
    { type: 'TURN', floor: 'floor1' },
    { type: 'UNIT', floor: 'floor2' },
  ];
  await printPlay(1, events);
  expect(printBoard).toHaveBeenCalledWith('floor1', 0);
  expect(printBoard).toHaveBeenCalledWith('floor2', 0);
});

test('ignores events of unknown type', async () => {
  const events = [{ type: 'UNKNOWN' }];
  await printPlay(1, events);
});

test('sleeps the specified time after each event', async () => {
  const events = [
    { type: 'TURN' },
    { type: 'UNIT' },
    { type: 'TURN' },
    { type: 'UNIT' },
  ];
  await printPlay(1, events, 42);
  expect(delay).toHaveBeenCalledTimes(4);
  expect(delay).toHaveBeenCalledWith(42);
});
