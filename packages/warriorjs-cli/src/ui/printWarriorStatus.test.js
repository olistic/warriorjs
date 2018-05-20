import style from 'ansi-styles';

import printRow from './printRow';
import printWarriorStatus from './printWarriorStatus';

jest.mock('./printRow');

test('prints warrior health in bright red', () => {
  const warrior = {
    health: 20,
  };
  printWarriorStatus(warrior);
  expect(printRow).toHaveBeenCalledWith(
    `${style.redBright.open}♥ 20${style.redBright.close}`,
  );
});

test('prints warrior score in bright yellow', () => {
  const warrior = {
    score: 10,
  };
  printWarriorStatus(warrior);
  expect(printRow).toHaveBeenCalledWith(
    `${style.yellowBright.open}♦ 10${style.yellowBright.close}`,
  );
});
