import getTowerId from './getTowerId';

test('returns the tower id for official towers', () => {
  expect(getTowerId('@warriorjs/tower-foo')).toBe('foo');
});

test('returns the tower id for community towers', () => {
  expect(getTowerId('warriorjs-tower-foo')).toBe('foo');
});
