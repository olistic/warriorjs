import { expect, test } from 'vitest';

import getLevelConfig from './getLevelConfig.js';

const tower = {
  name: 'Foo',
  description: 'A test tower',
  warrior: {
    character: '@',
    color: '#fff',
    maxHealth: 20,
  },
  levels: [
    {
      floor: {
        warrior: { abilities: { a: 1 }, position: { x: 0, y: 0, facing: 'east' } },
        size: { width: 1, height: 1 },
        stairs: { x: 0, y: 0 },
        units: [],
      },
    },
    {
      floor: {
        warrior: { abilities: { b: 2, c: 3 }, position: { x: 0, y: 0, facing: 'east' } },
        size: { width: 1, height: 1 },
        stairs: { x: 0, y: 0 },
        units: [],
      },
    },
    {
      floor: {
        warrior: { position: { x: 0, y: 0, facing: 'east' } },
        size: { width: 1, height: 1 },
        stairs: { x: 0, y: 0 },
        units: [],
      },
    },
    {
      floor: {
        warrior: { abilities: { a: 4 }, position: { x: 0, y: 0, facing: 'east' } },
        size: { width: 1, height: 1 },
        stairs: { x: 0, y: 0 },
        units: [],
      },
    },
  ],
} as any;

test('merges tower warrior with level warrior', () => {
  const config = getLevelConfig(tower, 1, 'Joe', false);
  expect(config).not.toBeNull();
  expect(config!.floor.warrior).toEqual({
    character: '@',
    color: '#fff',
    maxHealth: 20,
    name: 'Joe',
    abilities: { a: 1 },
    position: { x: 0, y: 0, facing: 'east' },
  });
});

test('accumulates abilities from all levels if epic', () => {
  const config = getLevelConfig(tower, 1, 'Joe', true);
  expect(config!.floor.warrior.abilities).toEqual({ a: 4, b: 2, c: 3 });
});

test('accumulates abilities up to current level', () => {
  const config = getLevelConfig(tower, 2, 'Joe', false);
  expect(config!.floor.warrior.abilities).toEqual({ a: 1, b: 2, c: 3 });
});

test('returns null for non-existent level', () => {
  expect(getLevelConfig(tower, 5, 'Joe', false)).toBeNull();
});

test('does not mutate original tower config', () => {
  const config = getLevelConfig(tower, 1, 'Joe', false);
  config!.floor.warrior.name = 'Modified';
  expect(tower.warrior).not.toHaveProperty('name');
  expect(tower.levels[0].floor.warrior).not.toHaveProperty('name');
});
