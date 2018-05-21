import style from 'ansi-styles';

import printRow from './printRow';
import printSeparator from './printSeparator';

jest.mock('./printRow');

test('prints row of dimmed gray tildes', () => {
  printSeparator();
  expect(printRow).toHaveBeenCalledWith('', {
    padding: `${style.gray.open}${style.dim.open}~${style.dim.close}${
      style.gray.close
    }`,
  });
});
