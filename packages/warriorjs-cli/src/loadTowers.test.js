import mock from 'mock-fs';

import Tower from './Tower';
import loadTowers from './loadTowers';

jest.mock('@warriorjs/tower-beginner', () => ({
  name: 'beginner',
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
  expect(Tower).toHaveBeenCalledWith('beginner', 'beginner', []);
});

test('loads official towers', () => {
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
        'tower-foo': {
          'package.json': '',
          'index.js': "module.exports = { name: 'Foo', levels: [] }",
        },
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).toHaveBeenCalledWith('foo', 'Foo', []);
});

test('loads community towers', () => {
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
      },
      'warriorjs-tower-foo': {
        'package.json': '',
        'index.js': "module.exports = { name: 'Foo', levels: [] }",
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).toHaveBeenCalledWith('foo', 'Foo', []);
});

test("ignores directories that are seemingly towers but don't have a package.json", () => {
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
        'tower-foo': {
          'index.js': "module.exports = { name: 'Foo', levels: [] }",
        },
      },
      'warriorjs-tower-bar': {
        'index.js': "module.exports = { name: 'Bar', levels: [] }",
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).not.toHaveBeenCalledWith('foo', 'Foo', []);
  expect(Tower).not.toHaveBeenCalledWith('bar', 'Bar', []);
});
