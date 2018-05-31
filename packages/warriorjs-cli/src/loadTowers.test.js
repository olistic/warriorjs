import mock from 'mock-fs';

import Tower from './Tower';
import loadTowers from './loadTowers';

jest.mock('@warriorjs/tower-beginner', () => ({
  name: 'beginner',
  description: 'A tower for beginners.',
  levels: [],
}));
jest.mock('find-up', () => ({
  sync: () => '/path/to/node_modules',
}));
jest.mock('./Tower');

test('loads internal towers', () => {
  mock({ '/path/to/node_modules/@warriorjs/cli': {} });
  loadTowers();
  mock.restore();
  expect(Tower).toHaveBeenCalledWith(
    'beginner',
    'beginner',
    'A tower for beginners.',
    [],
  );
});

test('loads official towers', () => {
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
        'tower-foo': {
          'package.json': '',
          'index.js':
            "module.exports = { name: 'Foo', description: 'bar', levels: [] }",
        },
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).toHaveBeenCalledWith('foo', 'Foo', 'bar', []);
});

test('loads community towers', () => {
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
      },
      'warriorjs-tower-foo': {
        'package.json': '',
        'index.js':
          "module.exports = { name: 'Foo', description: 'bar', levels: [] }",
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).toHaveBeenCalledWith('foo', 'Foo', 'bar', []);
});

test("ignores directories that are seemingly towers but don't have a package.json", () => {
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
        'tower-foo': {
          'index.js':
            "module.exports = { name: 'Foo', description: 'baz', levels: [] }",
        },
      },
      'warriorjs-tower-bar': {
        'index.js':
          "module.exports = { name: 'Bar', description: 'baz', levels: [] }",
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).not.toHaveBeenCalledWith('foo', 'Foo', 'baz', []);
  expect(Tower).not.toHaveBeenCalledWith('bar', 'Bar', 'baz', []);
});
