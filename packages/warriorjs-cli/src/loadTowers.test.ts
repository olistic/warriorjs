import mock from 'mock-fs';
import { beforeEach, expect, test, vi } from 'vitest';
import loadTowers from './loadTowers.js';
import Tower from './Tower.js';

const { mockRequire } = vi.hoisted(() => {
  const mockRequire = vi.fn();
  return { mockRequire };
});

vi.mock('module', async (importOriginal) => {
  const original = (await importOriginal()) as any;
  return {
    ...original,
    createRequire: () => mockRequire,
  };
});

vi.mock('find-up', () => ({
  findUpSync: vi.fn().mockReturnValue('/path/to/node_modules'),
}));
vi.mock('./Tower.js');

beforeEach(() => {
  vi.clearAllMocks();
});

test('loads internal towers', () => {
  mockRequire.mockReturnValue({
    name: 'Baby Steps',
    description: 'For players new to WarriorJS',
    levels: ['level1', 'level2'],
  });
  mock({ '/path/to/node_modules/@warriorjs/cli': {} });
  loadTowers();
  mock.restore();
  expect(Tower).toHaveBeenCalledWith('baby-steps', 'Baby Steps', 'For players new to WarriorJS', [
    'level1',
    'level2',
  ]);
});

test('loads external official towers', () => {
  mockRequire.mockImplementation((path: string) => {
    if (path.includes('tower-foo')) {
      return { name: 'Foo', description: 'bar', levels: ['level1', 'level2'] };
    }
    return {
      name: 'Baby Steps',
      description: 'For players new to WarriorJS',
      levels: ['level1', 'level2'],
    };
  });
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
        'tower-foo': {
          'package.json': '',
          'index.js':
            "module.exports = { name: 'Foo', description: 'bar', levels: ['level1', 'level2'] }",
        },
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).toHaveBeenCalledWith('foo', 'Foo', 'bar', ['level1', 'level2']);
});

test('loads external community towers', () => {
  mockRequire.mockImplementation((path: string) => {
    if (path.includes('warriorjs-tower-foo')) {
      return { name: 'Foo', description: 'bar', levels: ['level1', 'level2'] };
    }
    return {
      name: 'Baby Steps',
      description: 'For players new to WarriorJS',
      levels: ['level1', 'level2'],
    };
  });
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
      },
      'warriorjs-tower-foo': {
        'package.json': '',
        'index.js':
          "module.exports = { name: 'Foo', description: 'bar', levels: ['level1', 'level2'] }",
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).toHaveBeenCalledWith('foo', 'Foo', 'bar', ['level1', 'level2']);
});

test("ignores directories that are seemingly towers but don't have a package.json", () => {
  mockRequire.mockReturnValue({
    name: 'Baby Steps',
    description: 'For players new to WarriorJS',
    levels: ['level1', 'level2'],
  });
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
        'tower-foo': {
          'index.js':
            "module.exports = { name: 'Foo', description: 'baz', levels: ['level1', 'level2'] }",
        },
      },
      'warriorjs-tower-bar': {
        'index.js':
          "module.exports = { name: 'Bar', description: 'baz', levels: ['level1', 'level2'] }",
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).not.toHaveBeenCalledWith('foo', 'Foo', 'baz', ['level1', 'level2']);
  expect(Tower).not.toHaveBeenCalledWith('bar', 'Bar', 'baz', ['level1', 'level2']);
});

test("doesn't throw when @warriorjs/cli doesn't exist", async () => {
  mockRequire.mockReturnValue({
    name: 'Baby Steps',
    description: 'For players new to WarriorJS',
    levels: ['level1', 'level2'],
  });
  const { findUpSync } = await import('find-up');
  (findUpSync as any).mockReturnValue(null);
  loadTowers();
});
