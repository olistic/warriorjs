import { test, expect, vi } from 'vitest';
import chalk from 'chalk';

import getUnitStyle from './getUnitStyle.js';
import printLine from './printLine.js';
import printLogMessage from './printLogMessage.js';

vi.mock('./getUnitStyle.js');
vi.mock('./printLine.js');

test('prints log message with dimmed gray prompt', () => {
  const unitStyle = vi.fn((string: string) => string);
  (getUnitStyle as any).mockReturnValue(unitStyle);
  const unit = { name: 'Joe' } as any;
  const prompt = chalk.gray.dim('>');
  printLogMessage(unit, 'is awesome!');
  expect(getUnitStyle).toHaveBeenCalledWith(unit);
  expect(unitStyle).toHaveBeenCalledWith('Joe is awesome!');
  expect(printLine).toHaveBeenCalledWith(`${prompt} Joe is awesome!`);
});
