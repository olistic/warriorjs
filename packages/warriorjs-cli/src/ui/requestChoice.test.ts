import { test, expect, vi } from 'vitest';

import { select } from '@inquirer/prompts';

import requestChoice from './requestChoice.js';

vi.mock('@inquirer/prompts', () => ({
  select: vi.fn(),
  Separator: class Separator {},
}));

test('requests selection from the user', async () => {
  (select as any).mockResolvedValue('bar');
  const answer = await requestChoice('foo', ['bar', 'baz']);
  expect(answer).toBe('bar');
  expect(select).toHaveBeenCalledWith({
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
  });
});
