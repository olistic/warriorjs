import getScreenSize from './getScreenSize';
import printLine from './printLine';
import printRow from './printRow';

jest.mock('./getScreenSize');
jest.mock('./printLine');

test('prints message and fills with padding', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo', { position: 'start', padding: ' ' });
  expect(printLine).toHaveBeenCalledWith('foo       ');
});

test('positions message at the start by default', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo');
  expect(printLine).toHaveBeenCalledWith('foo       ');
});

test('positions message in the middle if specified', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo', { position: 'middle' });
  expect(printLine).toHaveBeenCalledWith('   foo    ');
});

test('positions message at the end if specified', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo', { position: 'end' });
  expect(printLine).toHaveBeenCalledWith('       foo');
});

test('uses whitespace as padding character by default', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo');
  expect(printLine).toHaveBeenCalledWith('foo       ');
});

test('allows to specify padding character', () => {
  getScreenSize.mockReturnValue([11, 0]);
  printRow('foo', { padding: '-' });
  expect(printLine).toHaveBeenCalledWith('foo-------');
});
