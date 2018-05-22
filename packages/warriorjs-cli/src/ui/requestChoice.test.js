import inquirer from 'inquirer';

import requestChoice from './requestChoice';

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

test('requests selection from the user', async () => {
  inquirer.prompt.mockResolvedValue({ requestChoice: 'bar' });
  const answer = await requestChoice('foo', ['bar', 'baz']);
  expect(answer).toBe('bar');
  expect(inquirer.prompt).toHaveBeenCalledWith([
    {
      name: 'requestChoice',
      type: 'list',
      message: 'foo',
      choices: [
        {
          name: 'bar',
          short: 'bar',
          value: 'bar',
        },
        {
          name: 'baz',
          short: 'baz',
          value: 'baz',
        },
      ],
    },
  ]);
});
