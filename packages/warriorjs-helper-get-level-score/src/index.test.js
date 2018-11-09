import getClearBonus from './getClearBonus';
import getLevelScore from '.';
import getRemainingTimeBonus from './getRemainingTimeBonus';
import getWarriorScore from './getWarriorScore';

jest.mock('./getClearBonus');
jest.mock('./getRemainingTimeBonus');
jest.mock('./getWarriorScore');

const levelConfig = { timeBonus: 16 };

test('returns null when level failed', () => {
  expect(getLevelScore({ passed: false }, levelConfig)).toBeNull();
});

describe('level passed', () => {
  let levelResult;

  beforeEach(() => {
    levelResult = {
      passed: true,
      events: 'events',
    };
  });

  test('has warrior score part', () => {
    getWarriorScore.mockReturnValue(8);
    expect(getLevelScore(levelResult, levelConfig).warrior).toBe(8);
  });

  test('has time bonus part', () => {
    getRemainingTimeBonus.mockReturnValue(10);
    expect(getLevelScore(levelResult, levelConfig).timeBonus).toBe(10);
    expect(getRemainingTimeBonus).toHaveBeenCalledWith('events', 16);
  });

  test('has clear bonus part', () => {
    getWarriorScore.mockReturnValue(8);
    getRemainingTimeBonus.mockReturnValue(12);
    getClearBonus.mockReturnValue(4);
    expect(getLevelScore(levelResult, levelConfig).clearBonus).toBe(4);
    expect(getClearBonus).toHaveBeenCalledWith('events', 8, 12);
  });
});
