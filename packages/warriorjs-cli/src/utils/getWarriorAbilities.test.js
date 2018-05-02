import getWarriorAbilities from './getWarriorAbilities';

test('returns abilities available in the given levels', () => {
  const levels = [
    { floor: { warrior: { abilities: { a: 1 } } } },
    { floor: { warrior: { abilities: { b: 2, c: 3 } } } },
    { floor: { warrior: {} } },
    { floor: { warrior: { abilities: { a: 4 } } } },
  ];
  expect(getWarriorAbilities(levels)).toEqual({ a: 4, b: 2, c: 3 });
});
