import { input } from '@inquirer/prompts';
import { expect, test, vi } from 'vitest';

import requestInput from './requestInput.js';

vi.mock('@inquirer/prompts', () => ({
  input: vi.fn(),
}));

test('requests input from the user', async () => {
  (input as any).mockResolvedValue('42');
  const answer = await requestInput('foo');
  expect(answer).toBe('42');
  expect(input).toHaveBeenCalledWith({
    message: 'foo',
  });
});

test('requests input from the user with suggestions (ignored in new API)', async () => {
  (input as any).mockResolvedValue('bar');
  const answer = await requestInput('foo', ['bar', 'baz']);
  expect(answer).toBe('bar');
  expect(input).toHaveBeenCalledWith({
    message: 'foo',
  });
});
