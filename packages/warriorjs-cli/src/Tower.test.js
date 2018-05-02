import Tower from './Tower';

describe('Tower.getTowerByName', () => {
  test('returns tower by name', () => {
    const originalGetTowers = Tower.getTowers;
    const tower = new Tower('foo');
    Tower.getTowers = () => [tower];
    expect(Tower.getTowerByName('foo')).toBe(tower);
    Tower.getTowers = originalGetTowers;
  });
});

describe('Tower.getTowers', () => {
  test('returns available towers', () => {
    expect(Tower.getTowers().map(tower => tower.name)).toEqual(['beginner']);
  });
});

describe('Tower', () => {
  let tower;

  beforeEach(() => {
    tower = new Tower('beginner', ['level1', 'level2']);
  });

  test('has a name', () => {
    expect(tower.name).toBe('beginner');
  });

  test('has some levels', () => {
    expect(tower.levels).toEqual(['level1', 'level2']);
  });

  test('knows if it has a given level', () => {
    expect(tower.hasLevel(1)).toBe(true);
    expect(tower.hasLevel(3)).toBe(false);
  });

  test('returns the level with the given number', () => {
    expect(tower.getLevel(1)).toBe('level1');
  });

  test('has a nice string representation', () => {
    expect(tower.toString()).toBe('beginner');
  });
});
