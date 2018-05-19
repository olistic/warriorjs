import style from 'ansi-styles';

import printRow from './printRow';
import printWelcomeHeader from './printWelcomeHeader';

jest.mock('./printRow');

test('prints welcome header', () => {
  printWelcomeHeader();
  expect(printRow).toHaveBeenCalledWith(
    '',
    'center',
    `${style.gray.open}~${style.gray.close}`,
  );
  expect(printRow).toHaveBeenCalledWith(
    '#*~+--~.~--+~$#',
    'center',
    `${style.gray.open}~${style.gray.close}`,
  );
  expect(printRow).toHaveBeenCalledWith(
    '* Welcome to WarriorJS! *',
    'center',
    `${style.gray.open}~${style.gray.close}`,
  );
  expect(printRow).toHaveBeenCalledWith(
    '#$~+--~*~--+~*#',
    'center',
    `${style.gray.open}~${style.gray.close}`,
  );
  expect(printRow).toHaveBeenCalledWith(
    '',
    'center',
    `${style.gray.open}~${style.gray.close}`,
  );
});
