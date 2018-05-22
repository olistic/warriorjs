import inquirer from 'inquirer';

import requestInput from './requestInput';

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
  registerPrompt: jest.fn(),
}));

test('requests input from the user', async () => {
  inquirer.prompt.mockResolvedValue({ requestInput: 42 });
  const answer = await requestInput('foo');
  expect(answer).toBe(42);
  expect(inquirer.prompt).toHaveBeenCalledWith([
    {
      name: 'requestInput',
      type: 'input',
      message: 'foo',
      suggestions: [],
    },
  ]);
});

test('requests input from the user and makes suggestions', async () => {
  inquirer.prompt.mockResolvedValue({ requestInput: 'bar' });
  const answer = await requestInput('foo', ['bar', 'baz']);
  expect(answer).toBe('bar');
  expect(inquirer.prompt).toHaveBeenCalledWith([
    {
      name: 'requestInput',
      type: 'suggest',
      message: 'foo',
      suggestions: ['bar', 'baz'],
    },
  ]);
});
