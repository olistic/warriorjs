import { test, expect, vi } from 'vitest';

import printFloorMap from './printFloorMap.js';
import printLevel from './printLevel.js';
import printLevelHeader from './printLevelHeader.js';

vi.mock('./printFloorMap.js');
vi.mock('./printLevelHeader.js');

test('prints level header, description, and floor map', () => {
  const level = {
    number: 1,
    description: 'foo',
    floorMap: 'map',
  };
  printLevel(level as any);
  expect(printLevelHeader).toHaveBeenCalledWith(1);
  expect(printFloorMap).toHaveBeenCalledWith('map');
});
