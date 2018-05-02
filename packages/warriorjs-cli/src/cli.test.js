import Game from './Game';
import { run } from './cli';

jest.mock('./Game');

test('starts the game', async () => {
  const mockStart = jest.fn();
  Game.mockImplementation(() => ({ start: mockStart }));
  await run(['-d', '/path/to/game', '-l', '2', '-s', '-t', '0.3']);
  expect(Game).toHaveBeenCalledWith('/path/to/game', 2, true, 0.3);
  expect(mockStart).toHaveBeenCalled();
});
