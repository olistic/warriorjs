import style from 'ansi-styles';

import printLine from './printLine';
import printWarningLine from './printWarningLine';

jest.mock('./printLine');

test('prints given line in yellow', () => {
  printWarningLine('foo');
  expect(printLine).toHaveBeenCalledWith(
    `${style.yellow.open}foo${style.yellow.close}`,
  );
});
