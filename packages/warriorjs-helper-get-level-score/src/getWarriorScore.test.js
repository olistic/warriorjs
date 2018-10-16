import getLastEvent from './getLastEvent';
import getWarriorScore from './getWarriorScore';

jest.mock('./getLastEvent');

test('returns the score of the warrior at the end of the play', () => {
  getLastEvent.mockReturnValue({ warriorStatus: { score: 42 } });
  expect(getWarriorScore('events')).toBe(42);
  expect(getLastEvent).toHaveBeenCalledWith('events');
});
