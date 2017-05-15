import Profile from '../src/Profile';

describe('Profile', () => {
  let profile;

  beforeEach(() => {
    profile = new Profile();
  });

  it('should have warrior name', () => {
    profile.warriorName = 'Joe';
    expect(profile.warriorName).toEqual('Joe');
  });

  it('should start level number at 0', () => {
    expect(profile.levelNumber).toBe(0);
  });

  it('should start score at 0', () => {
    expect(profile.score).toEqual(0);
  });

  it('should have no abilities and allow adding', () => {
    expect(profile.abilities.length).toBe(0);
    profile.addAbilities([
      { name: 'foo', args: [] },
      { name: 'bar', args: [] },
    ]);
    expect(profile.abilities).toContainEqual({ name: 'foo', args: [] });
    expect(profile.abilities).toContainEqual({ name: 'bar', args: [] });
  });

  it('should encode with JSON + base64', () => {
    expect(profile.encode()).toEqual(new Buffer(JSON.stringify(profile)).toString('base64'));
  });

  it('should add abilities and remove duplicates', () => {
    profile.addAbilities([
      { name: 'foo', args: [] },
      { name: 'bar', args: [] },
      { name: 'blah', args: [] },
      { name: 'bar', args: [] },
    ]);
    expect(profile.abilities.length).toEqual(3);
    expect(profile.abilities).toContainEqual({ name: 'foo', args: [] });
    expect(profile.abilities).toContainEqual({ name: 'bar', args: [] });
    expect(profile.abilities).toContainEqual({ name: 'blah', args: [] });
  });

  it('should enable epic mode and reset scores if null', () => {
    profile.epicScore = null;
    profile.currentEpicScore = null;
    profile.enableEpicMode();
    expect(profile.isEpic()).toBe(true);
    expect(profile.epicScore).toBe(0);
    expect(profile.currentEpicScore).toBe(0);
  });

  it('should override epic score with current one if it is higher', () => {
    profile.enableEpicMode();
    expect(profile.epicScore).toBe(0);
    expect(profile.averageGrade).toBeNull();
    profile.currentEpicScore = 123;
    profile.currentEpicGrades = { 1: 0.7, 2: 0.9 };
    profile.updateEpicScore();
    expect(profile.epicScore).toBe(123);
    expect(profile.averageGrade).toBe(0.8);
  });

  it('should not override epic score with current one if it is lower', () => {
    profile.enableEpicMode();
    profile.epicScore = 124;
    profile.averageGrade = 0.9;
    profile.currentEpicScore = 123;
    profile.currentEpicGrades = { 1: 0.7, 2: 0.9 };
    profile.updateEpicScore();
    expect(profile.epicScore).toBe(124);
    expect(profile.averageGrade).toBe(0.9);
  });

  it('should not calculate average grade if no grades are present', () => {
    profile.enableEpicMode();
    profile.currentEpicGrades = {};
    expect(profile.calculateAverageGrade()).toBeNull();
  });

  it('should remember current level number as lastLevelNumber', () => {
    profile.levelNumber = 7;
    profile.enableEpicMode();
    expect(profile.lastLevelNumber).toBe(7);
  });

  it('should enable normal mode by clearing epic scores and resetting last level number', () => { // eslint-disable-line max-len
    profile.lastLevelNumber = 7;
    profile.epicScore = 123;
    profile.currentEpicScore = 100;
    profile.currentEpicGrades = { 1: 100 };
    profile.averageGrade = 'C';
    profile.enableNormalMode();
    expect(profile.isEpic()).toBe(false);
    expect(profile.epicScore).toBe(0);
    expect(profile.currentEpicScore).toBe(0);
    expect(profile.lastLevelNumber).toBeNull();
    expect(profile.averageGrade).toBeNull();
    expect(profile.currentEpicGrades).toEqual({});
    expect(profile.levelNumber).toBe(7);
  });
});
