import { test, expect, vi, beforeEach } from 'vitest';

import getScreenSize from './getScreenSize.js';
import printLine from './printLine.js';
import printRow from './printRow.js';

vi.mock('./getScreenSize.js');
vi.mock('./printLine.js');

beforeEach(() => {
  vi.clearAllMocks();
});

test('prints message and fills with padding', () => {
  (getScreenSize as any).mockReturnValue([11, 0]);
  printRow('foo', { position: 'start', padding: ' ' });
  expect(printLine).toHaveBeenCalledWith('foo       ');
});

test('positions message at the start by default', () => {
  (getScreenSize as any).mockReturnValue([11, 0]);
  printRow('foo');
  expect(printLine).toHaveBeenCalledWith('foo       ');
});

test('positions message in the middle if specified', () => {
  (getScreenSize as any).mockReturnValue([11, 0]);
  printRow('foo', { position: 'middle' });
  expect(printLine).toHaveBeenCalledWith('   foo    ');
});

test("doesn't print message if position is unknown", () => {
  printRow('foo', { position: 'foo' });
  expect(printLine).not.toHaveBeenCalled();
});

test('positions message at the end if specified', () => {
  (getScreenSize as any).mockReturnValue([11, 0]);
  printRow('foo', { position: 'end' });
  expect(printLine).toHaveBeenCalledWith('       foo');
});

test('uses whitespace as padding character by default', () => {
  (getScreenSize as any).mockReturnValue([11, 0]);
  printRow('foo');
  expect(printLine).toHaveBeenCalledWith('foo       ');
});

test('allows to specify padding character', () => {
  (getScreenSize as any).mockReturnValue([11, 0]);
  printRow('foo', { padding: '-' });
  expect(printLine).toHaveBeenCalledWith('foo-------');
});
