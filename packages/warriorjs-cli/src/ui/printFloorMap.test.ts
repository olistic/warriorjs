import { expect, test, vi } from 'vitest';

import getUnitStyle from './getUnitStyle.js';
import printFloorMap from './printFloorMap.js';
import printLine from './printLine.js';

vi.mock('./getUnitStyle.js');
vi.mock('./printLine.js');

test('prints floor map', () => {
  const unitStyle = vi.fn((string: string) => string);
  (getUnitStyle as any).mockReturnValue(unitStyle);
  const map = [
    [{ character: 'a' }, { character: 'b', unit: 'unit' }],
    [{ character: 'c' }, { character: 'd' }],
  ];
  printFloorMap(map as any);
  expect(getUnitStyle).toHaveBeenCalledWith('unit');
  expect(unitStyle).toHaveBeenCalledWith('b');
  expect(printLine).toHaveBeenCalledWith('ab\ncd');
});
