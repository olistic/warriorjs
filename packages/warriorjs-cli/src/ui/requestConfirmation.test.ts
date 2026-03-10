import { test, expect, vi } from 'vitest';

import { confirm } from '@inquirer/prompts';

import requestConfirmation from './requestConfirmation.js';

vi.mock('@inquirer/prompts', () => ({
  confirm: vi.fn(),
}));

test('requests confirmation from the user', async () => {
  (confirm as any).mockResolvedValue(true);
  const answer = await requestConfirmation('foo', true);
  expect(answer).toBe(true);
  expect(confirm).toHaveBeenCalledWith({
    message: 'foo',
    default: true,
  });
});

test('default option defaults to false', async () => {
  (confirm as any).mockResolvedValue(false);
  await requestConfirmation('foo');
  expect(confirm).toHaveBeenCalledWith({
    message: 'foo',
    default: false,
  });
});
