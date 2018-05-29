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
  expect(Tower).toHaveBeenCalledWith('beginner', []);
});

test('loads official towers', () => {
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
        'tower-foo': {
          'package.json': '',
          'index.js': "module.exports = { name: 'foo', levels: [] }",
        },
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).toHaveBeenCalledWith('foo', []);
});

test('loads community towers', () => {
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
      },
      'warriorjs-tower-foo': {
        'package.json': '',
        'index.js': "module.exports = { name: 'foo', levels: [] }",
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).toHaveBeenCalledWith('foo', []);
});

test("ignores directories that are seemingly towers but don't have a package.json", () => {
  mock({
    '/path/to/node_modules': {
      '@warriorjs': {
        cli: {},
        'tower-foo': {
          'index.js': "module.exports = { name: 'foo', levels: [] }",
        },
      },
      'warriorjs-tower-bar': {
        'index.js': "module.exports = { name: 'bar', levels: [] }",
      },
    },
  });
  loadTowers();
  mock.restore();
  expect(Tower).not.toHaveBeenCalledWith('foo', []);
  expect(Tower).not.toHaveBeenCalledWith('bar', []);
});
