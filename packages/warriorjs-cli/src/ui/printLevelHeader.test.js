import printHeader from './printHeader';
import printLevelHeader from './printLevelHeader';

jest.mock('./printHeader');

test('prints level header', () => {
  printLevelHeader(1);
  expect(printHeader).toHaveBeenCalledWith('level 1', '#');
});
