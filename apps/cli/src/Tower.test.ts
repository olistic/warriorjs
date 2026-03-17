import { beforeEach, describe, expect, test } from 'vitest';

import Tower from './Tower.js';

describe('Tower', () => {
  let tower: Tower;

  beforeEach(() => {
    tower = new Tower('foo', 'Foo', 'bar baz', 'warrior' as any, ['level1', 'level2'] as any);
  });

  test('has an id', () => {
    expect(tower.id).toBe('foo');
  });

  test('has a name', () => {
    expect(tower.name).toBe('Foo');
  });

  test('has a description', () => {
    expect(tower.description).toBe('bar baz');
  });

  test('has a warrior', () => {
    expect(tower.warrior).toEqual('warrior');
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
    expect(tower.toString()).toBe('Foo');
  });
});
