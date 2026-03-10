import { test, expect, vi } from 'vitest';

import Game from './Game.js';
import { run } from './cli.js';

vi.mock('./Game.js', () => {
  const MockGame = vi.fn(function(this: any) {});
  return { default: MockGame, __esModule: true };
});

test('starts the game', async () => {
  const mockStart = vi.fn();
  (Game as any).mockImplementation(function(this: any) { this.start = mockStart; });
  await run(['-d', '/path/to/game', '-l', '2', '-s', '-t', '0.3', '-y']);
  expect(Game).toHaveBeenCalledWith('/path/to/game', 2, true, 0.3, true);
  expect(mockStart).toHaveBeenCalled();
});
