import print from './print';
import printLine from './printLine';

jest.mock('./print');

test('prints given message followed by a line-break', () => {
  printLine('foo');
  expect(print).toHaveBeenCalledWith('foo\n');
});
