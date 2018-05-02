import style from 'ansi-styles';

import getScreenSize from './getScreenSize';
import printLine from './printLine';
import printHeader from './printHeader';

jest.mock('./getScreenSize');
jest.mock('./printLine');

test('prints header with padding in gray', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printHeader('foo');
  const padding = `${style.gray.open}---${style.gray.close}`;
  expect(printLine).toHaveBeenCalledWith(`${padding} foo ${padding}`);
});
