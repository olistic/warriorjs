import style from 'ansi-styles';

import printRow from './printRow';
import printWelcomeHeader from './printWelcomeHeader';

jest.mock('./printRow');

test('prints welcome header', () => {
  printWelcomeHeader();
  expect(printRow).toHaveBeenCalledWith(
    `${style.gray.open}${style.dim.open}+*+~~~+*$#$*+~~~+*+${style.dim.close}${
      style.gray.close
    }`,
    {
      position: 'middle',
      padding: `${style.gray.open}${style.dim.open}~${style.dim.close}${
        style.gray.close
      }`,
    },
  );
  expect(printRow).toHaveBeenCalledWith(
    `${style.cyan.open}Welcome to WarriorJS!${style.cyan.close}`,
    {
      position: 'middle',
    },
  );
});
