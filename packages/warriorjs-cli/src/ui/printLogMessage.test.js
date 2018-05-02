import style from 'ansi-styles';

import getUnitStyle from './getUnitStyle';
import printLine from './printLine';
import printLogMessage from './printLogMessage';

jest.mock('./getUnitStyle');
jest.mock('./printLine');

test('prints log message with gray prompt', () => {
  getUnitStyle.mockImplementation(() => unit => unit);
  const unit = { name: 'Joe' };
  const prompt = `${style.gray.open}>${style.gray.close}`;
  printLogMessage(unit, 'is awesome!');
  expect(printLine).toHaveBeenCalledWith(`${prompt} Joe is awesome!`);
});
