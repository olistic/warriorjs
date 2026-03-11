import { expect, test } from 'vitest';

import getLevelConfig from './index.js';

const tower = {
  id: 'foo',
  name: 'Foo',
  levels: [
    { floor: { warrior: { abilities: { a: 1 }, bar: 'baz' }, foo: 42 } },
    { floor: { warrior: { abilities: { b: 2, c: 3 } } } },
    { floor: { warrior: {} } },
    { floor: { warrior: { abilities: { a: 4 } } } },
  ],
};

test('returns level config', () => {
  expect(getLevelConfig(tower, 1, 'Joe', false)).toEqual({
    number: 1,
    floor: {
      foo: 42,
      warrior: {
        bar: 'baz',
        name: 'Joe',
        abilities: { a: 1 },
      },
    },
  });
});

test('gets abilities from all levels if epic', () => {
  expect(getLevelConfig(tower, 1, 'Joe', true)).toEqual({
    number: 1,
    floor: {
      foo: 42,
      warrior: {
        bar: 'baz',
        name: 'Joe',
        abilities: { a: 4, b: 2, c: 3 },
      },
    },
  });
});

test('returns null for non-existent level', () => {
  expect(getLevelConfig(tower, 5, 'Joe', false)).toBeNull();
});

test('preserves functions in cloned config', () => {
  const abilityFn = () => ({ action: true, description: 'test' });
  const playTurn = () => {};
  const towerWithFns = {
    levels: [
      {
        floor: {
          warrior: { abilities: { walk: abilityFn } },
          units: [{ playTurn }],
        },
      },
    ],
  };
  const config = getLevelConfig(towerWithFns, 1, 'Joe', false);
  expect(config).not.toBeNull();
  expect(config!.floor.units[0].playTurn).toBe(playTurn);
});

test('does not mutate original tower config', () => {
  const towerCopy = {
    levels: [{ floor: { warrior: { abilities: { a: 1 } } } }],
  };
  const config = getLevelConfig(towerCopy, 1, 'Joe', false);
  config!.floor.warrior.name = 'Modified';
  expect(towerCopy.levels[0].floor.warrior).not.toHaveProperty('name');
});
