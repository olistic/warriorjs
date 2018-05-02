import getLevelConfig from './getLevelConfig';
import getWarriorAbilities from './getWarriorAbilities';

jest.mock('./getWarriorAbilities');

const tower = {
  levels: ['level1', 'level2'],
  getLevel: () => ({ floor: { foo: 42, warrior: { bar: 'baz' } } }),
};
const profile = {
  warriorName: 'Joe',
  isEpic: () => false,
};
getWarriorAbilities.mockReturnValue('abilities');

test('returns level config', async () => {
  const levelConfig = await getLevelConfig(1, tower, profile);
  expect(levelConfig).toEqual({
    number: 1,
    floor: {
      foo: 42,
      warrior: {
        bar: 'baz',
        name: 'Joe',
        abilities: 'abilities',
      },
    },
  });
  expect(getWarriorAbilities).toHaveBeenCalledWith(['level1']);
});

test('gets abilities from all levels if epic', async () => {
  profile.isEpic = () => true;
  await getLevelConfig(1, tower, profile);
  expect(getWarriorAbilities).toHaveBeenCalledWith(['level1', 'level2']);
});
