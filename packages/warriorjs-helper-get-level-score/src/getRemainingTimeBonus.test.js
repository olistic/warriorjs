import getRemainingTimeBonus from './getRemainingTimeBonus';
import getTurnCount from './getTurnCount';

jest.mock('./getTurnCount');

test('subtracts the number of turns played from the initial time bonus', () => {
  getTurnCount.mockReturnValue(3);
  expect(getRemainingTimeBonus('events', 10)).toBe(7);
  expect(getTurnCount).toHaveBeenCalledWith('events');
});

test("doesn't go below zero", () => {
  getTurnCount.mockReturnValue(11);
  expect(getRemainingTimeBonus('events', 10)).toBe(0);
  expect(getTurnCount).toHaveBeenCalledWith('events');
});
