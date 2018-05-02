import PlayerError from './PlayerError';
import PlayerLoader from './PlayerLoader';

describe('PlayerLoader', () => {
  let playerLoader;

  beforeEach(() => {
    playerLoader = new PlayerLoader();
  });

  test('runs player code and returns playTurn method', async () => {
    const playerCode = 'class Player { playTurn() { return 42; } }';
    const player = playerLoader.load(playerCode);
    expect(player.playTurn()).toBe(42);
  });

  test('throws if invalid syntax', async () => {
    const playerCode = 'class Player { playTurn() {';
    expect(() => {
      playerLoader.load(playerCode);
    }).toThrow(PlayerError);
  });

  test('throws if Player class is not defined', async () => {
    const playerCode = 'function playTurn() {}';
    await expect(() => {
      playerLoader.load(playerCode);
    }).toThrow(
      new PlayerError(
        'Invalid submitted code. You must define a Player class!',
      ),
    );
  });

  test('throws if playTurn method is not defined', async () => {
    const playerCode = 'class Player {}';
    await expect(() => {
      playerLoader.load(playerCode);
    }).toThrow(
      new PlayerError(
        'Invalid submitted code. Your Player class must define a playTurn method!',
      ),
    );
  });
});
