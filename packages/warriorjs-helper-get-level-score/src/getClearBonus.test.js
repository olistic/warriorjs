import getClearBonus from './getClearBonus';
import getLastEvent from './getLastEvent';
import isFloorClear from './isFloorClear';

jest.mock('./getLastEvent');
jest.mock('./isFloorClear');

test('returns the 20% of the sum of the warrior score and the time bonus with clear level', () => {
  getLastEvent.mockReturnValue({ floorMap: 'map' });
  isFloorClear.mockReturnValue(true);
  expect(getClearBonus('events', 3, 2)).toBe(1);
  expect(getLastEvent).toHaveBeenCalledWith('events');
  expect(isFloorClear).toHaveBeenCalledWith('map');
});

test('returns zero if the level is not clear', () => {
  getLastEvent.mockReturnValue({ floorMap: 'map' });
  isFloorClear.mockReturnValue(false);
  expect(getClearBonus('events', 3, 2)).toBe(0);
  expect(getLastEvent).toHaveBeenCalledWith('events');
  expect(isFloorClear).toHaveBeenCalledWith('map');
});
