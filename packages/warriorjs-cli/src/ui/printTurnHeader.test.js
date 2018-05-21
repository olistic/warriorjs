import style from 'ansi-styles';

import printRow from './printRow';
import printTurnHeader from './printTurnHeader';

jest.mock('./printRow');

test('prints turn header', () => {
  printTurnHeader(1);
  expect(printRow).toHaveBeenCalledWith(
    `${style.gray.open}${style.dim.open} 001 ${style.dim.close}${
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
