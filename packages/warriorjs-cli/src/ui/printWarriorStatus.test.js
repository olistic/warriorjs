import style from 'ansi-styles';

import getScreenSize from './getScreenSize';
import printLine from './printLine';
import printWarriorStatus from './printWarriorStatus';

jest.mock('./getScreenSize');
jest.mock('./printLine');

test('prints warrior health in red', () => {
  getScreenSize.mockReturnValue([5, 0]);
  const warrior = {
    health: 20,
  };
  printWarriorStatus(warrior);
  expect(printLine).toHaveBeenCalledWith(
    `${style.red.open}♥ 20 ${style.red.close}`,
  );
});
