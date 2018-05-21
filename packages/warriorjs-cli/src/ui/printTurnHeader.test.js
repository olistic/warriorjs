import style from 'ansi-styles';

import printRow from './printRow';
import printTurnHeader from './printTurnHeader';

jest.mock('./printRow');

test('prints turn header', () => {
  printTurnHeader(1);
  expect(printRow).toHaveBeenCalledWith(' turn 001 ', {
    position: 'middle',
    padding: `${style.gray.open}-${style.gray.close}`,
  });
});
