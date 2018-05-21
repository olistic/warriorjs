import style from 'ansi-styles';

import printRow from './printRow';
import printSeparator from './printSeparator';

jest.mock('./printRow');

test('prints row of gray dashes', () => {
  printSeparator();
  expect(printRow).toHaveBeenCalledWith('', {
    padding: `${style.gray.open}-${style.gray.close}`,
  });
});
