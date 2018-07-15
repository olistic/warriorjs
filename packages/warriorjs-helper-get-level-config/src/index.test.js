import getLevelConfig from '.';

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
