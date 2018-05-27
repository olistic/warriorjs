import style from 'ansi-styles';

import getScreenSize from './getScreenSize';
import printLine from './printLine';
import printWelcomeMessage from './printWelcomeMessage';

jest.mock('./getScreenSize');
jest.mock('./printLine');

test('prints logo with the sword in cyan', () => {
  getScreenSize.mockReturnValue([67]);
  printWelcomeMessage();
  expect(printLine).not.toHaveBeenCalledWith('Welcome to WarriorJS');
  expect(printLine).toHaveBeenCalled();

  const logoLines = printLine.mock.calls[0][0].split('\n');

  // Top of sword is cyan.
  expect(logoLines[1]).toMatch(
    `${style.cyan.open}${' '.repeat(36)}▁▁▁${style.cyan.close}`,
  );

  expect(logoLines[4]).toMatch('Welcome to');

  // Middle line contains white text with cyan sword.
  expect(logoLines[10]).toMatch(
    `${style.white.open}  ▝█▖▗██▖▗█▘▗█▘▝█▖  █▄▄▄▟▘ █▄▄▄▟▘ ${
      style.white.close
    }  ${style.cyan.open}█ █${style.cyan.close}  ${
      style.white.open
    }█    █ █▄▄▄▟▘     █ ▝████▖${style.white.close}`,
  );

  // Last part of sword is cyan.
  expect(logoLines[logoLines.length - 1]).toMatch(`${' '.repeat(37)}▀`);
});

test('does not print logo when it can not fit', () => {
  getScreenSize.mockReturnValue([66]);
  printWelcomeMessage();
  expect(printLine).toHaveBeenCalledWith('Welcome to WarriorJS');
});
