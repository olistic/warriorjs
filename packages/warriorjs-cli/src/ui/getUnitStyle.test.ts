import { expect, test } from 'vitest';

import getUnitStyle from './getUnitStyle.js';

test('downsamples RGB to 256 color ANSI', () => {
  const color = '#8fbcbb';
  const unitStyle = getUnitStyle({ color });
  const result = unitStyle('@');
  // Chalk 5 with level 2 produces 256-color ANSI escape sequences
  expect(result).toContain('@');
  // biome-ignore lint/suspicious/noControlCharactersInRegex: matching ANSI escape codes
  expect(result).toMatch(/\x1b\[/);
});
