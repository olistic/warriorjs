import style from 'ansi-styles';

import printRow from './printRow';
import printLevelHeader from './printLevelHeader';

jest.mock('./printRow');

test('prints level header', () => {
  printLevelHeader(1);
  expect(printRow).toHaveBeenCalledWith(
    `${style.gray.open}${style.dim.open} level 1 ${style.dim.close}${
      style.gray.close
    }`,
    {
      position: 'middle',
      padding: `${style.gray.open}${style.dim.open}~${style.dim.close}${
        style.gray.close
      }`,
    },
  );
});
