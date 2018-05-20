import style from 'ansi-styles';

import printRow from './printRow';
import printLevelHeader from './printLevelHeader';

jest.mock('./printRow');

test('prints level header', () => {
  printLevelHeader(1);
  expect(printRow).toHaveBeenCalledWith(
    ' level 1 ',
    'center',
    `${style.gray.open}#${style.gray.close}`,
  );
});
