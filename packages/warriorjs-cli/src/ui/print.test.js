import print from './print';

test('prints given message to stdout', () => {
  process.stdout.write = jest.fn();
  print('foo');
  expect(process.stdout.write).toHaveBeenCalledWith('foo');
});
