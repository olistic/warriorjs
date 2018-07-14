import inquirer from 'inquirer';

import requestConfirmation from './requestConfirmation';

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

test('requests confirmation from the user', async () => {
  inquirer.prompt.mockResolvedValue({ requestConfirmation: 42 });
  const answer = await requestConfirmation('foo', true);
  expect(answer).toBe(42);
  expect(inquirer.prompt).toHaveBeenCalledWith([
    {
      name: 'requestConfirmation',
      type: 'confirm',
      message: 'foo',
      default: true,
    },
  ]);
});

test('default option defaults to false', async () => {
  await requestConfirmation('foo');
  expect(inquirer.prompt).toHaveBeenCalledWith([
    {
      name: 'requestConfirmation',
      type: 'confirm',
      message: 'foo',
      default: false,
    },
  ]);
});
