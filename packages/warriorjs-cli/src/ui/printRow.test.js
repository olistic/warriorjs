import getScreenSize from './getScreenSize';
import printLine from './printLine';
import printRow from './printRow';

jest.mock('./getScreenSize');
jest.mock('./printLine');

test('prints message and fills with padding', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo', 'left', ' ');
  expect(printLine).toHaveBeenCalledWith('foo       ');
});

test('aligns left by default', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo');
  expect(printLine).toHaveBeenCalledWith('foo       ');
});

test('aligns center if specified', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo', 'center');
  expect(printLine).toHaveBeenCalledWith('   foo    ');
});

test('aligns right if specified', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo', 'right');
  expect(printLine).toHaveBeenCalledWith('       foo');
});

test('uses whitespace as padding character by default', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo', 'left');
  expect(printLine).toHaveBeenCalledWith('foo       ');
});

test('allows to specify padding character', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo', 'left', '-');
  expect(printLine).toHaveBeenCalledWith('foo-------');
});
