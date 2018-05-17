import style from 'ansi-styles';

import printHeader from './printHeader';
import printRow from './printRow';

jest.mock('./printRow');

test('prints header centered and with gray dash as padding', () => {
  printHeader('foo');
  expect(printRow).toHaveBeenCalledWith(
    ' foo ',
    'center',
    `${style.gray.open}-${style.gray.close}`,
  );
});
