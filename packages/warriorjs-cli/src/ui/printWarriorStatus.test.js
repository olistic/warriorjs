import style from 'ansi-styles';

import getScreenSize from './getScreenSize';
import printLine from './printLine';
import printWarriorStatus from './printWarriorStatus';

jest.mock('./getScreenSize');
jest.mock('./printLine');

test('prints warrior health in bright red', () => {
  getScreenSize.mockReturnValue([5, 0]);
  const warrior = {
    health: 20,
  };
  printWarriorStatus(warrior);
  expect(printLine).toHaveBeenCalledWith(
    `${style.redBright.open}♥ 20 ${style.redBright.close}`,
  );
});

test('prints warrior score in bright yellow', () => {
  getScreenSize.mockReturnValue([5, 0]);
  const warrior = {
    score: 10,
  };
  printWarriorStatus(warrior);
  expect(printLine).toHaveBeenCalledWith(
    `${style.yellowBright.open}♦ 10 ${style.yellowBright.close}`,
  );
});
