import style from 'ansi-styles';

import printLine from './printLine';
import printSuccessLine from './printSuccessLine';

jest.mock('./printLine');

test('prints given line in green', () => {
  printSuccessLine('foo');
  expect(printLine).toHaveBeenCalledWith(
    `${style.green.open}foo${style.green.close}`,
  );
});
