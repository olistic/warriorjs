import style from 'ansi-styles';

import printFailureLine from './printFailureLine';
import printLine from './printLine';

jest.mock('./printLine');

test('prints given line in red', () => {
  printFailureLine('foo');
  expect(printLine).toHaveBeenCalledWith(
    `${style.red.open}foo${style.red.close}`,
  );
});
