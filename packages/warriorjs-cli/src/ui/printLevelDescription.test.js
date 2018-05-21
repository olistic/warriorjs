import style from 'ansi-styles';

import getScreenSize from './getScreenSize';
import printLevelDescription from './printLevelDescription';
import printLine from './printLine';

jest.mock('./getScreenSize');
jest.mock('./printLine');

test('prints level description in italics', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printLevelDescription('foo');
  expect(printLine).toHaveBeenCalledWith(
    `${style.italic.open}foo${style.italic.close}`,
  );
});

test("wraps description if it's wider than screen", () => {
  getScreenSize.mockReturnValue([11, 0]);
  printLevelDescription('foo foo foo foo');
  expect(printLine).toHaveBeenCalledWith(
    `${style.italic.open}foo foo foo${style.italic.close}\n${
      style.italic.open
    }foo${style.italic.close}`,
  );
});
