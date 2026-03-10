import { expect, test, vi } from 'vitest';

import print from './print.js';

test('prints given message to stdout', () => {
  process.stdout.write = vi.fn() as any;
  print('foo');
  expect(process.stdout.write).toHaveBeenCalledWith('foo');
});
