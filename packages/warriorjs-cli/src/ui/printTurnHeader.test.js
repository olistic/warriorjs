import printHeader from './printHeader';
import printTurnHeader from './printTurnHeader';

jest.mock('./printHeader');

test('prints turn header', () => {
  printTurnHeader(1);
  expect(printHeader).toHaveBeenCalledWith('turn 001', '-');
});
