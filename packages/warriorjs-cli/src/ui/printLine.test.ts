import { expect, test, vi } from 'vitest';

import print from './print.js';
import printLine from './printLine.js';

vi.mock('./print.js');

test('prints given message followed by a line-break', () => {
  printLine('foo');
  expect(print).toHaveBeenCalledWith('foo\n');
});
