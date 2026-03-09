import { test, expect, vi } from 'vitest';
import getClearBonus from './getClearBonus.js';
import getLastEvent from './getLastEvent.js';
import isFloorClear from './isFloorClear.js';

vi.mock('./getLastEvent.js');
vi.mock('./isFloorClear.js');

test('returns the 20% of the sum of the warrior score and the time bonus with clear level', () => {
  vi.mocked(getLastEvent).mockReturnValue({ floorMap: 'map' });
  vi.mocked(isFloorClear).mockReturnValue(true);
  expect(getClearBonus([['events']] as unknown[][], 3, 2)).toBe(1);
  expect(getLastEvent).toHaveBeenCalledWith([['events']]);
  expect(isFloorClear).toHaveBeenCalledWith('map');
});

test('returns zero if the level is not clear', () => {
  vi.mocked(getLastEvent).mockReturnValue({ floorMap: 'map' });
  vi.mocked(isFloorClear).mockReturnValue(false);
  expect(getClearBonus([['events']] as unknown[][], 3, 2)).toBe(0);
  expect(getLastEvent).toHaveBeenCalledWith([['events']]);
  expect(isFloorClear).toHaveBeenCalledWith('map');
});
