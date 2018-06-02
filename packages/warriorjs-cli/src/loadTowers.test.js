import findUp from 'find-up';
import mock from 'mock-fs';

import Tower from './Tower';
import loadTowers from './loadTowers';

jest.mock('@warriorjs/tower-beginner', () => ({
  name: 'beginner',
  description: 'A tower for beginners.',
  levels: ['level1', 'level2'],
}));
jest.mock('find-up');
jest.mock('./Tower');

findUp.sync = jest.fn().mockReturnValue('/path/to/node_modules');

test('loads internal towers', () => {
  mock({ '/path/to/node_modules/@warriorjs/cli': {} });
  loadTowers();
  mock.restore();
  expect(Tower).toHaveBeenCalledWith(
    'beginner',
    'beginner',
    'A tower for beginners.',
    ['level1', 'level2'],
  );
});

test('loads external official towers', () => {
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
  expect(Tower).not.toHaveBeenCalledWith('foo', 'Foo', 'baz', [
    'level1',
    'level2',
  ]);
  expect(Tower).not.toHaveBeenCalledWith('bar', 'Bar', 'baz', [
    'level1',
    'level2',
  ]);
});

test("doesn't throw when @warriorjs/cli doesn't exist", () => {
  findUp.sync.mockReturnValue(null);
  loadTowers();
});
