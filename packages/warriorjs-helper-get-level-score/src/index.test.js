import getClearBonus from './getClearBonus';
import getGradeForScore from './getGradeForScore';
import getLevelScore from '.';
import getRemainingTimeBonus from './getRemainingTimeBonus';
import getWarriorScore from './getWarriorScore';

jest.mock('./getClearBonus');
jest.mock('./getGradeForScore');
jest.mock('./getRemainingTimeBonus');
jest.mock('./getWarriorScore');

const levelConfig = { timeBonus: 16, aceScore: 26 };

test('returns null when level failed', () => {
  expect(getLevelScore({ passed: false }, levelConfig)).toBeNull();
});

describe('level passed', () => {
  let play;

  beforeEach(() => {
    play = {
      passed: true,
      events: 'events',
    };
  });

  test('has warrior score part', () => {
    getWarriorScore.mockReturnValue(8);
    expect(getLevelScore(play, levelConfig).parts.warrior).toBe(8);
  });

  test('has time bonus part', () => {
    getRemainingTimeBonus.mockReturnValue(10);
    expect(getLevelScore(play, levelConfig).parts.timeBonus).toBe(10);
    expect(getRemainingTimeBonus).toHaveBeenCalledWith('events', 16);
  });

  test('has clear bonus part', () => {
    getWarriorScore.mockReturnValue(8);
    getRemainingTimeBonus.mockReturnValue(12);
    getClearBonus.mockReturnValue(4);
    expect(getLevelScore(play, levelConfig).parts.clearBonus).toBe(4);
    expect(getClearBonus).toHaveBeenCalledWith('events', 8, 12);
  });

  test('has total score', () => {
    getWarriorScore.mockReturnValue(8);
    getRemainingTimeBonus.mockReturnValue(12);
    getClearBonus.mockReturnValue(4);
    expect(getLevelScore(play, levelConfig).total).toBe(24);
  });

  test('has grade', () => {
    getWarriorScore.mockReturnValue(8);
    getRemainingTimeBonus.mockReturnValue(12);
    getClearBonus.mockReturnValue(4);
    getGradeForScore.mockReturnValue(0.9);
    expect(getLevelScore(play, levelConfig).grade).toBe(0.9);
    expect(getGradeForScore).toHaveBeenCalledWith(24, 26);
  });
});
